import React from 'react'
import ManageUserClient from './ManageUserClient'
import { getRoles, getUsers } from '@/lib/server_functions/users/queries'

export default async function AddUser() {
    const users = await getUsers();
    const roles = await getRoles()
    console.log(users);

    return (
        <ManageUserClient roles={roles} users={users} />
    )
}
