"use server"

import pool from "@/lib/db"
import { Class } from "@/types/server_functions/manage-class";
import { ClassMemberView, User } from "@/types/users";
import { unstable_cache } from "next/cache"


export const getAllClass = unstable_cache(async () => {
    const res = await pool.query('select c.id , c.name , COUNT(cm.userid) as student_count  from class c left join class_members cm on cm.classid=c.id group by c.id;');
    const data = res?.rows as Class[]
    return data || []

}, ['class'], {
    revalidate: 120,
    tags: ['class']
})


export const getAllUsersClass = async (id: string | number) => {
    const cachedFn = unstable_cache(async () => {
        const res = await pool.query('select * from class_members_view where class_id = $1', [id])
        return res?.rows as ClassMemberView[]
    }, [`class-users-${id}`], { tags: [`class-users-${id}`] })
    return cachedFn()
}

export const getNonLinkedUsers = unstable_cache(async () => {
    const res = await pool.query('select * from non_linked_users');
    return res?.rows as User[]
}, ['unlinked-users'], { tags: ['unlinked-users'] })