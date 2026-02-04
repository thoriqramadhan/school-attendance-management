'use client'
import DialogComponent from '@/components/reusable_ui/Dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import AddUserDialog from './_components/AddUserDialog'
import { User } from '@/types/users'

interface ManageUserClientProps {
    users: User[]
}
export default function ManageUserClient({ users }: ManageUserClientProps) {
    const [dialogState, setDialogState] = useState({
        add: false
    })
    function toggleDialogState(type: keyof typeof dialogState) {
        setDialogState(prev => ({ ...prev, [type]: !prev[type] }))
    }
    console.log(users);

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
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users?.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{item?.username}</TableCell>
                                        <TableCell>{item?.email}</TableCell>
                                        <TableCell>{item?.role}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <AddUserDialog open={dialogState?.add} onOpenChange={() => toggleDialogState('add')} />
        </section >
    )
}
