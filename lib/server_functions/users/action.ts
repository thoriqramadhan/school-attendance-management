'use server'
import pool from "@/lib/db";
import { User } from "@/types/users";
import { hash } from "bcryptjs";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createUserAction({ payload }: { payload: Omit<User, 'role'> & { password: string } }): Promise<GeneralResponse> {
    try {
        if (!payload.email || !payload.password || !payload.username || !payload.roleId) {
            return {
                success: false,
                message: 'payload invalid!'
            }
        }
        const hashedPassword = await hash(payload.password, 10);
        const res = await pool.query('INSERT INTO users (name , email , roleId , password) VALUES($1 , $2 ,$3 ,$4)', [payload?.username, payload?.email, payload?.roleId, hashedPassword])
        revalidateTag('users', 'max')
        revalidatePath('/manage-users')
        return {
            success: true,
            data: res.rows[0]
        }
    } catch (error) {
        console.error('CREATE USER ERROR:', error)
        return {
            success: false,
            message: (error as Error).message
        }
    }

}