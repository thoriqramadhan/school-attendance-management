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

const addUserSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    role: z.string(),
    password: z.string().min(8).max(16)
})
export type AddUserSchemaObject = z.infer<typeof addUserSchema>
export interface AddUserSubmitCallback {
    data: AddUserSchemaObject,
    form: UseFormReturn<AddUserSchemaObject>
}
interface AddUserDialogProps {
    roles: Role[]
    open: boolean,
    onOpenChange: () => void,
    submitCallback: ({ data, form }: AddUserSubmitCallback) => void
}
export default function AddUserDialog({ onOpenChange, open, submitCallback, roles }: AddUserDialogProps) {
    const form = useForm<z.infer<typeof addUserSchema>>({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            password: '12344321',
            role: roles[0]?.id?.toString()
        }
    })
    return (
        <DialogComponent title='Add User' open={open} onOpenChange={onOpenChange} >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(val => {
                    submitCallback({ data: val, form })
                })} className='space-y-5'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input type='text' required {...field} />
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='email' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' required {...field} />
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='password' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' required {...field} />
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='role' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={(val) => field.onChange(val)}>
                                <SelectTrigger className='w-full capitalize' defaultValue={form.getValues('role')}>
                                    <SelectValue className='capitalize' />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        roles?.map((item, i) => (
                                            <SelectItem value={item?.id?.toString()} className='capitalize' key={i}>{item?.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button className='w-full'>Create</Button>
                </form>
            </Form>
        </DialogComponent>
    )
}
