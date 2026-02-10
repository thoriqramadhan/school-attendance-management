'use server'
import pool from "@/lib/db";
import { User } from "@/types/users";
import { revalidateUserRelated } from "@/utils/revalidate";
import { hash } from "bcryptjs";

export async function createUserAction({ payload }: { payload: Omit<User, 'role'> & { password: string } }): Promise<GeneralResponse> {
    try {
        if (!payload.email || !payload.password || !payload.name || !payload.roleId) {
            return {
                success: false,
                message: 'payload invalid!'
            }
        }
        const hashedPassword = await hash(payload.password, 10);
        const res = await pool.query('INSERT INTO users (name , email , roleId , password) VALUES($1 , $2 ,$3 ,$4)', [payload?.name, payload?.email, payload?.roleId, hashedPassword])
        revalidateUserRelated()
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

export async function deleteUserAction(id: string): Promise<GeneralResponse> {
    try {
        console.log('called', id);

        if (!id) return { success: false, message: 'Id is required' }
        await pool.query('DELETE FROM users WHERE id = $1', [id])
        revalidateUserRelated()
        return { success: true }
    } catch (error) {
        console.log(error);
        return { success: false, message: (error as Error)?.message }
    }
}