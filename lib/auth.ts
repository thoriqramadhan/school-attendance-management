import bcrypt from 'bcryptjs'
import pool from './db'
import { DatabaseError } from 'pg';

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
