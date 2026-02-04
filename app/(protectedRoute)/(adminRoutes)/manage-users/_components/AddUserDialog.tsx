'use client'
import DialogComponent from '@/components/reusable_ui/Dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

interface AddUserDialogProps {
    open: boolean,
    onOpenChange: () => void
}
const addUserSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    role: z.string().refine(args => args == 'teacher' || args == 'children', { message: 'da' })
})
export default function AddUserDialog({ onOpenChange, open }: AddUserDialogProps) {
    const form = useForm<z.infer<typeof addUserSchema>>()
    return (
        <DialogComponent title='Add User' open={open} onOpenChange={onOpenChange} >
            <Form {...form}>
                <form action="" className='space-y-5'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input type='text' required {...field} />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='email' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' required {...field} />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='role' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={(val) => field.onChange(val)}>
                                <SelectTrigger className='w-full' defaultValue={'teacher'}>
                                    <SelectValue defaultValue={'teacher'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='teacher'>Teacher</SelectItem>
                                    <SelectItem value='student'>Student</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )} />
                    <Button className='w-full'>Create</Button>
                </form>
            </Form>
        </DialogComponent>
    )
}
