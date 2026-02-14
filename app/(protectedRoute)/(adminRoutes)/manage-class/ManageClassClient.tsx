'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookUser, Plus } from 'lucide-react'
import { useState } from 'react'
import AddClasssDialog, { AddClasssSchemaObject, AddClasssSubmitCallback } from './_components/AddClassDialog'
import { toggleModalState } from '@/utils/stateSetter'
import { errorBuilder } from '@/utils/builder'
import { toast } from 'sonner'
import { createClassAction } from '@/lib/server_functions/manage-class/action'
import { Class } from '@/types/server_functions/manage-class'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'

interface ManageClassClientProps {
    classDatas: Class[]
}
export default function ManageClassClient({ classDatas }: ManageClassClientProps) {
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
            form.setValue('name', '', {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true
            })
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
                                                <div className='absolute top-3 right-5 flex items-center justify-center space-x-0.5'>
                                                    <BookUser size={15} />
                                                    <p>{item?.student_count}</p>
                                                </div>
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
            <AddClasssDialog submitCallback={handleSubmit} onOpenChange={() => toggleModalState(setModalState, 'addClass')} open={modalState?.addClass} />
        </>
    )
}
