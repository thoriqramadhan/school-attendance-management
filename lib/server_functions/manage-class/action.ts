"use server"

import pool from "@/lib/db"
import { revalidateClassRelated } from "@/utils/revalidate";

export async function createClassAction({ name }: { name: string }): Promise<GeneralResponse> {
    try {
        const nameMapped = name?.trim()
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '')
        await pool.query('INSERT INTO class(name , created_at) VALUES ($1 , NOW())', [nameMapped]);
        revalidateClassRelated()
        return { success: true }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}