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



interface linkUserSegmentActionProps {
    userId: number | string,
    classId: number | string
}
export async function linkUserToClassAction({ classId, userId }: linkUserSegmentActionProps): Promise<GeneralResponse> {
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
export async function unlinkUserToClassAction({ classId, userId }: linkUserSegmentActionProps): Promise<GeneralResponse> {
    try {
        await pool.query('DELETE FROM class_members where classid=$1 AND userid=$2', [classId, userId])
        revalidateClassMembersRelated(classId)
        return { success: true }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}
export async function transferUserToClassAction({ classId, userId, newClassId }: linkUserSegmentActionProps & { newClassId: number | string }): Promise<GeneralResponse> {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        await client.query('DELETE FROM class_members where classid=$1 AND userid=$2', [classId, userId])
        await client.query('INSERT INTO class_members (classid, userid) VALUES ($1, $2)', [newClassId, userId])
        await client.query('COMMIT')
        revalidateClassMembersRelated(classId)
        return { success: true }
    } catch (error) {
        await client.query('ROLLBACK')
        return {
            success: false,
            message: (error as Error)?.message
        }
    } finally {
        client.release()
    }
}

