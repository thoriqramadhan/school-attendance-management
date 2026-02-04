import pool from "@/lib/db";
import { User } from "@/types/users";
import { unstable_cache } from "next/cache";

export const getUsers = unstable_cache(
    async () => {
        const res = await pool.query("SELECT u.name as username , email , rl.name as role FROM users u left join roles rl on u.roleid=rl.id where rl.name <> 'admin'");
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