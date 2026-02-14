"use server"

import pool from "@/lib/db"
import { Class } from "@/types/server_functions/manage-class";
import { unstable_cache } from "next/cache"


export const getAllClass = unstable_cache(async () => {
    const res = await pool.query('select c.id , c.name , COUNT(cm.userid) as student_count  from class c left join class_members cm on cm.classid=c.id group by c.id;');
    const data = res?.rows as Class[]
    return data

}, ['class'], {
    revalidate: 120,
    tags: ['class']
})