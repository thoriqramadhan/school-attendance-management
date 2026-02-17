'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
    ...props
}: LinkUserDialogProps) {
    const [selectedUserId, setSelectedUserId] = React.useState<string>('')

    function handleSubmit() {
        if (!selectedUserId) return
        onSubmit(selectedUserId)
        setSelectedUserId('')
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="text-black sm:max-w-md" {...props}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                        {users?.map((user) => (
                            <SelectItem key={user.id} value={String(user.id)}>
                                {user.name}
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
            </DialogContent>
        </Dialog>
    )
}
