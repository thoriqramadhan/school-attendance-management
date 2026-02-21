'use client'
import dynamic from 'next/dynamic'
const DialogComponent = dynamic(() => import('@/app/components/ConfirmationModal'))
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Class } from '@/types/server_functions/manage-class'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import React from 'react'
import ConfirmationModal from '@/app/components/ConfirmationModal'

const EditClassSchema = z.object({
    name: z.string().min(5),
})
export type EditClassSchemaObject = z.infer<typeof EditClassSchema>
export interface EditClassSubmitCallback {
    data: EditClassSchemaObject,
    form: UseFormReturn<EditClassSchemaObject>
}
interface EditClassDialogProps {
    open: boolean,
    onOpenChange: () => void,
    selectedClass: Class,
    submitCallback: ({ data, form }: EditClassSubmitCallback) => void,
}
export default function EditClassDialog({ open, onOpenChange, selectedClass, submitCallback }: EditClassDialogProps) {
    const form = useForm<EditClassSchemaObject>({
        resolver: zodResolver(EditClassSchema),
        defaultValues: {
            name: selectedClass?.name ?? ''
        }
    })

    return (
        <ConfirmationModal onConfirm={() => { }} title='Edit Class' open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(val => submitCallback({ data: val, form }))} className='space-y-5'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class Name</FormLabel>
                            <Input type='text' required {...field} />
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button className='w-full'>Save</Button>
                </form>
            </Form>
        </ConfirmationModal>
    )
}
