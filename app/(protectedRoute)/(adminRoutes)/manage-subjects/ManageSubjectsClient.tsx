'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Plus, Settings, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AddSubjectSubmitCallback } from './_components/AddSubjectDialog'
import dynamic from 'next/dynamic'
const AddSubjectDialog = dynamic(() => import('./_components/AddSubjectDialog'), {
    loading: () => null,
    ssr: false
})
const EditSubjectDialog = dynamic(() => import('./_components/EditSubjectDialog'), {
    loading: () => null,
    ssr: false
})
const ConfirmationModal = dynamic(() => import('@/app/components/ConfirmationModal'), {
    loading: () => null,
    ssr: false
})
import { toggleModalState } from '@/utils/stateSetter'
import { errorBuilder } from '@/utils/builder'
import { toast } from 'sonner'
import { createSubjectAction, deleteSubjectAction, editSubjectAction } from '@/lib/server_functions/manage-subjects/action'
import { Subject } from '@/types/server_functions/manage-subjects'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EditSubjectSubmitCallback } from './_components/EditSubjectDialog'
import { cleanString } from '@/utils/textFormat'

interface ManageSubjectsClientProps {
    subjectDatas: Subject[]
}
export default function ManageSubjectsClient({ subjectDatas }: ManageSubjectsClientProps) {
    const [modalState, setModalState] = useState({
        addSubject: false,
        editSubject: false,
        deleteSubject: false
    })
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

    async function handleSubmit({ data, form }: AddSubjectSubmitCallback) {
        try {
            if (!data?.name) throw errorBuilder('Failed to create subject', 'name is required')
            const res = await createSubjectAction({ name: data?.name })
            if (!res.success) throw errorBuilder('Failed to create subject', res?.message!)
            toast.success('Success creating ' + data?.name)
        } catch (error) {
            toast.error((error as Error)?.message)
        } finally {
            form.setValue('name', '', {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
            })
            toggleModalState(setModalState, 'addSubject')
        }
    }

    function toggleDeleteConfirmation(subject: Subject, event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
        setSelectedSubject(subject)
        toggleModalState(setModalState, 'deleteSubject')
    }

    function toggleEditConfirmation(subject: Subject) {
        setSelectedSubject(subject)
        toggleModalState(setModalState, 'editSubject')
    }

    async function handleDeleteSubject() {
        try {
            if (!selectedSubject) return
            const res = await deleteSubjectAction({ subjectId: selectedSubject.id })
            if (!res?.success) throw errorBuilder('Failed deleting subject', res.message!)
            toast.success('Success delete subject ' + selectedSubject.name)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    async function handleEditSubject({ data, form }: EditSubjectSubmitCallback) {
        try {
            if (!selectedSubject) return
            const res = await editSubjectAction({ subjectId: selectedSubject.id, name: data?.name })
            if (!res?.success) throw errorBuilder('Failed editing subject', res.message!)
            toast.success('Success editing subject ' + cleanString(data?.name))
            form.reset({ name: '' })
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <>
            <Card>
                <CardContent>
                    <CardHeader className='grid-cols-3 items-center'>
                        <CardTitle className='col-span-2'>Manage Subjects</CardTitle>
                        <div className="flex justify-end">
                            <Button className='w-fit' onClick={() => toggleModalState(setModalState, 'addSubject')}><Plus /> Add Subject</Button>
                        </div>
                    </CardHeader>
                    <section className='space-y-3'>
                        {
                            subjectDatas?.map((item, i) => (
                                <Card key={i} className='relative'>
                                    <CardContent className='capitalize'>
                                        <p className='text-lg font-semibold'>{item?.name?.replaceAll('_', ' ')}</p>
                                    </CardContent>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild className='absolute top-5 right-5' onClick={(e) => e.stopPropagation()}>
                                            <Settings size={20} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side='left' onClick={(e) => e.stopPropagation()}>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => toggleEditConfirmation(item)}>
                                                <Pencil />
                                                <p>Edit</p>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem variant='destructive' onClick={(e) => toggleDeleteConfirmation(item, e)}>
                                                <Trash2 />
                                                <p>Delete</p>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </Card>
                            ))
                        }
                    </section>
                </CardContent>
            </Card>
            {modalState?.editSubject && <EditSubjectDialog open={modalState?.editSubject} onOpenChange={() => toggleModalState(setModalState, 'editSubject')} selectedSubject={selectedSubject!} submitCallback={handleEditSubject} />}
            {modalState?.deleteSubject && <ConfirmationModal open={modalState?.deleteSubject} title='Delete Subject' onOpenChange={() => toggleModalState(setModalState, 'deleteSubject')} onConfirm={handleDeleteSubject} />}
            {modalState?.addSubject && <AddSubjectDialog submitCallback={handleSubmit} onOpenChange={() => toggleModalState(setModalState, 'addSubject')} open={modalState?.addSubject} />}
        </>
    )
}
