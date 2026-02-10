'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddClasssDialog, { AddClasssSchemaObject, AddClasssSubmitCallback } from './_components/AddClassDialog'
import { toggleModalState } from '@/utils/stateSetter'
import { errorBuilder } from '@/utils/builder'
import { toast } from 'sonner'
import { createClassAction } from '@/lib/server_functions/manage-class/action'

export default function ManageClassClient() {
    const [modalState, setModalState] = useState({
        addClass: false
    })
    async function handleSubmit({ data, form }: AddClasssSubmitCallback) {
        try {
            if (!data?.name) throw errorBuilder('Failed to create class', 'name is required');
            const res = await createClassAction({ name: data?.name })
            if (!res.success) throw errorBuilder('Failed to create class', res?.message!);
            toast.success('Success creating  ' + data?.name)
        } catch (error) {
            toast.error((error as Error)?.message)
        } finally {
            toggleModalState(setModalState, 'addClass')
        }
    }
    return (
        <>
            <Card>
                <CardContent>
                    <CardHeader className='grid-cols-3 items-center'>
                        <CardTitle className='col-span-2'>Manage Class</CardTitle>
                        <div className="flex justify-end">
                            <Button className='w-fit' onClick={() => toggleModalState(setModalState, 'addClass')}><Plus /> Add Class</Button>
                        </div>
                    </CardHeader>
                </CardContent>
            </Card>
            <AddClasssDialog submitCallback={handleSubmit} onOpenChange={() => toggleModalState(setModalState, 'addClass')} open={modalState?.addClass} />
        </>
    )
}
