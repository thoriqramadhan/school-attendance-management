"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { registerSchema } from '../authSchemas';
import { signUpAction } from '../authActions';

export default function RegisterPage() {
    const form = useForm<z.infer<typeof registerSchema>>(
        {
            resolver: zodResolver(registerSchema),
            defaultValues: {
                email: '',
                password: '',
                name: ''
            }
        }
    )
    async function handleSubmit(data: z.infer<typeof registerSchema>) {
        try {
            const res = await signUpAction(data)
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card className='w-full md:w-[500px]'>
            <CardContent className='w-full grid grid-cols-1'>
                <div className="text-xl font-medium">
                    <p>Register</p>
                    <Form {...form}>
                        <form className='mt-5 space-y-5' onSubmit={form.handleSubmit(handleSubmit)}>
                            <FormField control={form.control} name='name' render={({ field }) => <FormItem >
                                <FormLabel>Name</FormLabel>
                                <Input type='text' required {...field} />
                                <FormMessage />
                            </FormItem>} />
                            <FormField control={form.control} name='email' render={({ field }) => <FormItem >
                                <FormLabel>Email</FormLabel>
                                <Input type='email' required {...field} />
                                <FormMessage />
                            </FormItem>} />
                            <FormField control={form.control} name='password' render={({ field }) => <FormItem >
                                <FormLabel>Password</FormLabel>
                                <Input type='password' required {...field} />
                                <FormMessage />
                            </FormItem>} />
                            <Button type='submit' className='w-full'>Register</Button>
                        </form>
                        <div className="w-full mt-3 flex justify-end">
                            <Link className='text-end' href='/login' >Already have an account?</Link>
                        </div>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}
