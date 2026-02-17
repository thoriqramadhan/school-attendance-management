'use client'
import DialogComponent from '@/components/reusable_ui/Dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Role } from '@/types/users'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { FormEvent, FormEventHandler } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'

const AddClasssSchema = z.object({
    name: z.string().min(5),
})
export type AddClasssSchemaObject = z.infer<typeof AddClasssSchema>
export interface AddClasssSubmitCallback {
    data: AddClasssSchemaObject,
    form: UseFormReturn<AddClasssSchemaObject>
}
interface AddClasssDialogProps {
    open: boolean,
    onOpenChange: () => void,
    submitCallback: ({ data, form }: AddClasssSubmitCallback) => void
}
export default function AddClasssDialog({ onOpenChange, open, submitCallback }: AddClasssDialogProps) {
    const form = useForm<z.infer<typeof AddClasssSchema>>({
        resolver: zodResolver(AddClasssSchema),
    })
    console.log('DIALOG' + open);

    return (
        <DialogComponent title='Add Class' open={open} onOpenChange={onOpenChange} >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(val => {
                    submitCallback({ data: val, form })
                })} className='space-y-5'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class Name</FormLabel>
                            <Input type='text' required {...field} />
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button className='w-full'>Create</Button>
                </form>
            </Form>
        </DialogComponent>
    )
}
