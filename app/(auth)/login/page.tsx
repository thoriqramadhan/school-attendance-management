"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { loginAction, signUpAction } from '../authActions';
import { loginSchema } from '../authSchemas';
import { toast } from 'sonner';


export default function LoginPage() {
    const form = useForm<z.infer<typeof loginSchema>>(
        {
            resolver: zodResolver(loginSchema),
            defaultValues: {
                email: '',
                password: ''
            }
        }
    )
    async function handleSubmit(data: z.infer<typeof loginSchema>) {
        try {
            const res = await loginAction(data)
            if (!res.success) {
                toast.error(res.message)
                return
            }
            console.log(res);

        } catch (error) {
            toast.error('Failed login')
        }
    }
    return (
        <Card className='w-full md:w-[500px]'>
            <CardContent className='w-full  grid grid-cols-1'>
                <div className="text-xl font-medium">
                    <p>Login</p>
                    <Form {...form}>
                        <form className='mt-5 space-y-5' onSubmit={form.handleSubmit(handleSubmit)}>
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
                            <Button type='submit' className='w-full'>Login</Button>
                        </form>
                        <div className="w-full mt-3 flex justify-end">
                            <Link className='text-end' href='/register' >didn't have an account?</Link>
                        </div>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}
