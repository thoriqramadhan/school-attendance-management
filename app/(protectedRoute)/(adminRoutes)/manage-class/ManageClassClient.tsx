'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookUser, Pencil, Plus, Settings, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AddClasssSchemaObject, AddClasssSubmitCallback } from './_components/AddClassDialog'
const AddClasssDialog = dynamic(import('./_components/AddClassDialog'), {
    loading: () => null,
    ssr: false
})
import { toggleModalState } from '@/utils/stateSetter'
import { errorBuilder } from '@/utils/builder'
import { toast } from 'sonner'
import { createClassAction, deleteClassAction } from '@/lib/server_functions/manage-class/action'
import { Class } from '@/types/server_functions/manage-class'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ConfirmationModal from '@/app/components/ConfirmationModal'

interface ManageClassClientProps {
    classDatas: Class[]
}
export default function ManageClassClient({ classDatas }: ManageClassClientProps) {
    const [modalState, setModalState] = useState({
        addClass: false,
        editClass: false,
        deleteClass: false
    })
    const [selectedClass, setSelectedClass] = useState<number | null>(null)
    async function handleSubmit({ data, form }: AddClasssSubmitCallback) {
        try {
            if (!data?.name) throw errorBuilder('Failed to create class', 'name is required');
            const res = await createClassAction({ name: data?.name })
            if (!res.success) throw errorBuilder('Failed to create class', res?.message!);
            toast.success('Success creating  ' + data?.name)
        } catch (error) {
            toast.error((error as Error)?.message)
        } finally {
            form.setValue('name', '', {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
            })
            toggleModalState(setModalState, 'addClass')
        }
    }
    function toggleDeleteConfirmation(classId: number, event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
        setSelectedClass(classId)
        toggleModalState(setModalState, 'deleteClass')

    }
    async function handleDeleteClass() {
        try {
            if (!selectedClass) return
            const res = await deleteClassAction({ classId: selectedClass })
            if (!res?.success) throw errorBuilder('Failed deleting class', res.message!);
            toast.success('Success delete class ' + selectedClass)
        } catch (error) {
            toast.error((error as Error).message)
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
                    <section className='space-y-3'>
                        {
                            classDatas?.map((item, i) => (
                                <Tooltip key={i} >
                                    <TooltipTrigger className='w-full cursor-pointer' asChild>
                                        <Link href={`/manage-class/${item?.id}`} className='block'>
                                            <Card key={i} className='relative'>
                                                <CardContent className='capitalize '>
                                                    <p className='text-lg font-semibold'>{item?.name?.replaceAll('_', ' ')}</p>
                                                </CardContent>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild className='absolute top-5 right-5' onClick={(e) => e.stopPropagation()}>
                                                        <Settings size={20} />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent side='left' onClick={(e) => toggleDeleteConfirmation(item?.id, e)}>
                                                        <>User Linked : {item?.student_count}</>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem >
                                                            <Pencil />
                                                            <p>Edit</p>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem variant='destructive' onClick={(e) => toggleDeleteConfirmation(item?.id, e)}>
                                                            <Trash2 />
                                                            <p>Delete</p>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </Card>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side='bottom'>
                                        <p>Click to see class detail</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))
                        }
                    </section>
                </CardContent>
            </Card>
            {
                modalState?.deleteClass &&
                <ConfirmationModal open={modalState?.deleteClass} title='Delete Class' onOpenChange={() => toggleModalState(setModalState, 'deleteClass')} onConfirm={handleDeleteClass} />
            }
            {
                modalState?.addClass &&

                <AddClasssDialog submitCallback={handleSubmit} onOpenChange={() => toggleModalState(setModalState, 'addClass')} open={modalState?.addClass} />
            }
        </>
    )
}
