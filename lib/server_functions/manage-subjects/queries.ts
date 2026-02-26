"use server"

import pool from "@/lib/db"
import { Subject } from "@/types/server_functions/manage-subjects"
import { unstable_cache } from "next/cache"

export const getAllSubjects = unstable_cache(async () => {
    const res = await pool.query('SELECT * FROM subjects ORDER BY created_at DESC')
    return res?.rows as Subject[] || []
}, ['subjects'], {
    revalidate: 120,
    tags: ['subjects']
})
