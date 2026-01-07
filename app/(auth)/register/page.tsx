"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(8, { message: 'Password min 8.' })
})
export default function RegisterPage() {
    const form = useForm<z.infer<typeof registerSchema>>(
        {
            resolver: zodResolver(registerSchema),
            defaultValues: {
                email: '',
                password: ''
            }
        }
    )
    function handleSubmit() { }
    return (
        <Card className='w-full md:w-[500px]'>
            <CardContent className='w-full grid grid-cols-1'>
                <div className="text-xl font-medium">
                    <p>Register</p>
                    <Form {...form}>
                        <form className='mt-5 space-y-5' onSubmit={form.handleSubmit(handleSubmit)}>
                            <FormField control={form.control} name='email' render={({ field }) => <FormItem >
                                <FormLabel>Email</FormLabel>
                                <Input type='email' required {...field} />
                            </FormItem>} />
                            <FormField control={form.control} name='password' render={({ field }) => <FormItem >
                                <FormLabel>Password</FormLabel>
                                <Input type='password' required {...field} />

                            </FormItem>} />
                            <Button type='submit' className='w-full'>Submit</Button>
                        </form>
                        <div className="w-full mt-3 flex justify-end">
                            <Link className='text-end' href='/register' >Already have an account?</Link>
                        </div>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}
