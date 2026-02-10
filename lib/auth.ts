import bcrypt from 'bcryptjs'
import pool from './db'
import jwt from 'jsonwebtoken'
import { DatabaseError } from 'pg';
import { cookies } from 'next/headers';

export async function register({ email, name, password }: { name: string, email: string, password: string }): Promise<GeneralResponse> {
    try {
        let isEmptyError;
        if (email.length <= 0) {
            isEmptyError = true
        } else if (name.length <= 0) {
            isEmptyError = true
        } else if (password.length <= 0) {
            isEmptyError = true
        }
        if (isEmptyError) {
            return {
                success: false,
                message: 'Payload cant be empty!'
            }
        }

        const hashedPassword = bcrypt.hashSync(password)
        await pool.query('INSERT INTO users (name , email , password) VALUES ($1 ,$2 ,$3)', [name, email, hashedPassword])

        return {
            success: true
        }
    } catch (error: any) {
        if (error instanceof DatabaseError) {
            if (error.code === '23505') {
                throw new Error('EMAIL_ALREADY_EXISTS')
            }
        }
        throw error
    }


}

export async function login({ email, password }: { email: string, password: string }): Promise<GeneralResponse> {
    try {
        let isEmptyError;
        if (email.length <= 0) {
            isEmptyError = true
        } else if (password.length <= 0) {
            isEmptyError = true
        }
        if (isEmptyError) {
            return {
                success: false,
                message: 'Payload cant be empty!'
            }
        }
        const { rows } = await pool.query('SELECT u.id , u.name , email ,password , rl.name as role  FROM users u left join roles rl on u.roleid=rl.id WHERE u.email = $1', [email])
        const user = rows[0]

        if (!user) {
            return { success: false, message: 'Invalid credentials' }
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return { success: false, message: 'Invalid credentials' }
        console.log('Login : ', user);

        const token = jwt.sign({
            sub: user.id, role: user.role, name: user.name
            , email: user.email
        },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' });

        (await cookies()).set('access_token', token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        })
        return {
            success: true
        }
    } catch (error: any) {
        console.log(error);
        throw error
        return {
            success: false,
            message: error?.message
        }
    }
}