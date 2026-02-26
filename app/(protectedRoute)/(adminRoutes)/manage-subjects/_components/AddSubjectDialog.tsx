'use client'
import DialogComponent from '@/components/reusable_ui/Dialog'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'

const AddSubjectSchema = z.object({
    name: z.string().min(3),
})
export type AddSubjectSchemaObject = z.infer<typeof AddSubjectSchema>
export interface AddSubjectSubmitCallback {
    data: AddSubjectSchemaObject,
    form: UseFormReturn<AddSubjectSchemaObject>
}
interface AddSubjectDialogProps {
    open: boolean,
    onOpenChange: () => void,
    submitCallback: ({ data, form }: AddSubjectSubmitCallback) => void
}
export default function AddSubjectDialog({ onOpenChange, open, submitCallback }: AddSubjectDialogProps) {
    const form = useForm<AddSubjectSchemaObject>({
        resolver: zodResolver(AddSubjectSchema),
    })

    return (
        <DialogComponent title='Add Subject' open={open} onOpenChange={onOpenChange}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(val => {
                    submitCallback({ data: val, form })
                })} className='space-y-5'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject Name</FormLabel>
                            <Input type='text' placeholder='Subject name..' required {...field} />
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button className='w-full'>Create</Button>
                </form>
            </Form>
        </DialogComponent>
    )
}
