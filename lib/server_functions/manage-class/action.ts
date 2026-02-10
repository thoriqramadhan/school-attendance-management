"use server"

import pool from "@/lib/db"

export async function createClassAction({ name }: { name: string }): Promise<GeneralResponse> {
    try {
        const nameMapped = name?.replaceAll(' ', '_')?.toLowerCase()
        await pool.query('INSERT INTO class(name , created_at) VALUES ($1 , NOW())', [nameMapped]);
        return { success: true }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}