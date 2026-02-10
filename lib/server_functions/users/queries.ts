import pool from "@/lib/db";
import { Role, User } from "@/types/users";
import { unstable_cache } from "next/cache";

export const getUsers = unstable_cache(
    async () => {
        const res = await pool.query("SELECT u.id, u.name as name , email , rl.name as role , roleid as roleId FROM users u left join roles rl on u.roleid=rl.id where rl.name <> 'admin'");
        return res?.rows as User[] || []
    },
    [
        'users'
    ],
    {
        revalidate: 120,
        tags: ['users']
    }
)


export const getRoles = unstable_cache(
    async () => {
        const res = await pool.query("SELECT * from roles where name <> 'admin'")
        return res?.rows as Role[] || []
    },
    [
        'roles'
    ],
    {
        revalidate: 120,
        tags: ['roles']
    }
)