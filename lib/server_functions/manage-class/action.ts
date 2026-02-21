"use server"

import pool from "@/lib/db"
import { revalidateClassMembersRelated, revalidateClassRelated } from "@/utils/revalidate";
import { cleanString } from "@/utils/textFormat";

type classId = number | string

export async function createClassAction({ name }: { name: string }): Promise<GeneralResponse> {
    try {
        const nameMapped = cleanString(name)
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

export async function deleteClassAction({ classId }: { classId: classId }): Promise<GeneralResponse> {
    try {
        await pool.query('DELETE FROM class where id = $1', [classId])
        revalidateClassRelated()
        return { success: true }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}
export async function editClassAction({ classId, name }: { classId: classId, name?: string }): Promise<GeneralResponse> {
    try {
        if (!name) return { success: false, message: 'Name cant be empty!' }
        const filteredName = cleanString(name)
        await pool.query('UPDATE class set name = COALESCE($2 , name) where id = $1', [classId, filteredName])
        revalidateClassRelated()
        return { success: true }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}

interface linkUserToClassActionProps {
    userId: number | string,
    classId: number | string
}
export async function linkUserToClassAction({ classId, userId }: linkUserToClassActionProps): Promise<GeneralResponse> {
    try {
        await pool.query('INSERT INTO class_members(classid , userid) values ($1 , $2)', [classId, userId])
        revalidateClassMembersRelated(classId)
        return { success: true }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}

