'use client'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { AddUserSubmitCallback } from './_components/AddUserDialog'

const AddUserDialog = dynamic(() => import('./_components/AddUserDialog'), {
    loading: () => null,
    ssr: false
})
import { Role, User } from '@/types/users'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { createUserAction, deleteUserAction } from '@/lib/server_functions/users/action'
import { errorBuilder } from '@/utils/builder'
import { toast } from 'sonner'

interface ManageUserClientProps {
    users: User[]
    roles: Role[]
}
export default function ManageUserClient({ users, roles }: ManageUserClientProps) {
    const [dialogState, setDialogState] = useState({
        add: false
    })
    function toggleDialogState(type: keyof typeof dialogState) {
        setDialogState(prev => ({ ...prev, [type]: !prev[type] }))
    }
    async function addUserCallback({ data, form }: AddUserSubmitCallback) {
        try {
            const res = await createUserAction({ payload: { username: data?.name, email: data?.email, password: data?.password, roleId: data?.role } })
            if (!res.success) throw errorBuilder('Failed to create user', res.message!);
            toast.success('Success creating user')
            toggleDialogState('add')
            form.reset({
                email: '',
                name: '',
                password: '',
                role: ''
            })
        } catch (error) {
            console.log('fail');
            toast.error((error as Error).message)
        }
    }
    return (
        <section className='space-y-5'>
            <Tabs>
                <TabsList className='space-x-1'>
                    <TabsTrigger value='manage-user'>Manage Users</TabsTrigger>
                    <TabsTrigger value='d'>Manage Users</TabsTrigger>
                </TabsList>
            </Tabs>
            <Card>
                <CardHeader className='grid-cols-3 items-center'>
                    <CardTitle className='col-span-2'>Manage Users</CardTitle>
                    <Button onClick={() => toggleDialogState('add')}>Add User</Button>
                </CardHeader>
                <CardContent>
                    <Table className='table-fixed min-w-full '>
                        <TableHeader>
                            <TableRow className='*:text-center'>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users?.map((item, i) => (
                                    <TableRow className='text-center' key={i}>
                                        <TableCell>{item?.name}</TableCell>
                                        <TableCell>{item?.email}</TableCell>
                                        <TableCell>{item?.role}</TableCell>
                                        <TableCell className='flex justify-center items-center'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className='cursor-pointer hover:scale-110 transition-300'>
                                                    <Ellipsis size={15} />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={async () => await deleteUserAction(item?.id)}>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {
                dialogState?.add &&
                <AddUserDialog roles={roles} open={dialogState?.add} submitCallback={addUserCallback} onOpenChange={() => toggleDialogState('add')} />
            }
        </section >
    )
}
