'use client'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Subject } from '@/types/server_functions/manage-subjects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import ConfirmationModal from '@/app/components/ConfirmationModal'

const EditSubjectSchema = z.object({
    name: z.string().min(3),
})
export type EditSubjectSchemaObject = z.infer<typeof EditSubjectSchema>
export interface EditSubjectSubmitCallback {
    data: EditSubjectSchemaObject,
    form: UseFormReturn<EditSubjectSchemaObject>
}
interface EditSubjectDialogProps {
    open: boolean,
    onOpenChange: () => void,
    selectedSubject: Subject,
    submitCallback: ({ data, form }: EditSubjectSubmitCallback) => void
}
export default function EditSubjectDialog({ open, onOpenChange, selectedSubject, submitCallback }: EditSubjectDialogProps) {
    const form = useForm<EditSubjectSchemaObject>({
        resolver: zodResolver(EditSubjectSchema),
        defaultValues: {
            name: selectedSubject?.name ?? ''
        }
    })

    useEffect(() => {
        form.reset({ name: selectedSubject?.name ?? '' })
    }, [selectedSubject])

    const handleConfirm = form.handleSubmit(val => submitCallback({ data: val, form }))

    return (
        <ConfirmationModal onConfirm={handleConfirm} title='Edit Subject' open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form onSubmit={(e) => e.preventDefault()} className='space-y-5'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject Name</FormLabel>
                            <Input type='text' placeholder='Subject name..' required {...field} />
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>
        </ConfirmationModal>
    )
}
