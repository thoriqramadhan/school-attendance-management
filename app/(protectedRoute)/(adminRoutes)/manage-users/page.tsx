import React from 'react'
import ManageUserClient from './ManageUserClient'
import { getRoles, getUsers } from '@/lib/server_functions/users/queries'
import { headers } from 'next/headers';

export default async function AddUser() {
    const headerList = await headers()
    const userSession = headerList.get('x-user')
    console.log('usersess');
    console.log(userSession);

    const users = await getUsers();
    const roles = await getRoles()
    console.log(users);

    return (
        <ManageUserClient roles={roles} users={users} />
    )
}
