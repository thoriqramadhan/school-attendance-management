import React from 'react'
import ManageUserClient from './ManageUserClient'
import { getUsers } from '@/lib/server_functions/users/queries'

export default async function AddUser() {
    const users = await getUsers();

    return (
        <ManageUserClient users={users} />
    )
}
