'use client'

import React from 'react'
import DialogComponent from '@/components/reusable_ui/Dialog'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User } from '@/types/users'


interface LinkUserDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    users: User[]
    onSubmit: (userId: string) => void
    title?: string
    description?: string
}

export default function LinkUserDialog({
    open,
    onOpenChange,
    users,
    onSubmit,
    title = 'Link User',
    description,
}: LinkUserDialogProps) {
    console.log(users);

    const [selectedUserId, setSelectedUserId] = React.useState<string>('')

    function handleSubmit() {
        if (!selectedUserId) return
        onSubmit(selectedUserId)
        setSelectedUserId('')
    }

    return (
        <DialogComponent open={open} onOpenChange={onOpenChange} title={title} description={description} className="sm:max-w-md">
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="w-full text-black cursor-pointer">
                    <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                    {users?.map((user) => (
                        <SelectItem className='text-black' key={user.id} value={String(user.id)}>
                            {user.email} - <b>{user.name}</b> - {user?.role}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!selectedUserId}>
                    Link
                </Button>
            </DialogFooter>
        </DialogComponent>
    )
}
