import React from 'react'
import ManageUserClient from './ManageUserClient'
import { getRoles, getUsers } from '@/lib/server_functions/users/queries'
import { getLoggedUserDetail } from '@/lib/auth';

export default async function AddUser() {
    const userSession = await getLoggedUserDetail()
    console.log(userSession);

    const users = await getUsers();
    const roles = await getRoles()

    return (
        <ManageUserClient roles={roles} users={users} />
    )
}
