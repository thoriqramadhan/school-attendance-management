"use server"

import pool from "@/lib/db"
import { revalidateSubjectRelated } from "@/utils/revalidate"
import { cleanString } from "@/utils/textFormat"

type subjectId = number | string

export async function createSubjectAction({ name }: { name: string }): Promise<GeneralResponse> {
    try {
        const nameMapped = cleanString(name)
        await pool.query('INSERT INTO subjects(name, created_at) VALUES ($1, NOW())', [nameMapped])
        revalidateSubjectRelated()
        return { success: true }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}

export async function deleteSubjectAction({ subjectId }: { subjectId: subjectId }): Promise<GeneralResponse> {
    try {
        await pool.query('DELETE FROM subjects WHERE id = $1', [subjectId])
        revalidateSubjectRelated()
        return { success: true }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}

export async function editSubjectAction({ subjectId, name }: { subjectId: subjectId, name?: string }): Promise<GeneralResponse> {
    try {
        if (!name) return { success: false, message: 'Name cant be empty!' }
        const filteredName = cleanString(name)
        await pool.query('UPDATE subjects SET name = COALESCE($2, name) WHERE id = $1', [subjectId, filteredName])
        revalidateSubjectRelated()
        return { success: true }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}
