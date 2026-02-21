'use client'

import DialogComponent from '@/components/reusable_ui/Dialog'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Class } from '@/types/server_functions/manage-class'
import { useState } from 'react'

interface MoveClassDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    classes: Class[]
    currentClassId: string
    onSubmit: (newClassId: string) => void
}

export default function MoveClassDialog({ open, onOpenChange, classes, currentClassId, onSubmit }: MoveClassDialogProps) {
    const [selectedClassId, setSelectedClassId] = useState<string>('')

    function handleSubmit() {
        if (!selectedClassId) return
        onSubmit(selectedClassId)
        setSelectedClassId('')
    }

    const availableClasses = classes.filter(c => String(c.id) !== String(currentClassId))

    return (
        <DialogComponent open={open} onOpenChange={onOpenChange} title='Move User to Class' className='sm:max-w-md'>
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder='Select class' />
                </SelectTrigger>
                <SelectContent>
                    {availableClasses.map((cls) => (
                        <SelectItem key={cls.id} value={String(cls.id)}>
                            {cls.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <DialogFooter>
                <Button variant='outline' onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!selectedClassId}>Move</Button>
            </DialogFooter>
        </DialogComponent>
    )
}
