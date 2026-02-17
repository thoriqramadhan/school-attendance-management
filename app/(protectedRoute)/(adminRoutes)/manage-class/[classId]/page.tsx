import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllUsersClass } from '@/lib/server_functions/manage-class/queries';
import { Plus, Settings } from 'lucide-react';
import React from 'react'

export default async function ClassDetail({
    params
}: { params: Promise<{ classId: string }> }) {
    const { classId } = await params
    const classMembers = await getAllUsersClass(classId);
    console.log(classMembers.length, classMembers);

    return (
        <div className="w-full grid grid-cols-3 gap-5">
            <Card className='col-span-2'>
                <CardContent className='space-y-5'>
                    <CardHeader className='flex! px-0! justify-between flex-wrap md:grid md:grid-cols-5 items-center '>
                        <CardTitle className='md:col-span-4'>
                            Class User List
                        </CardTitle>
                        <Button className='w-full flex-wrap'>
                            <Plus />
                            Link User
                        </Button>
                    </CardHeader>
                    <hr className='w-full' />
                    <section className='w-full'>
                        {
                            classMembers?.length > 0 ? classMembers?.map((item, i) => (
                                <Card className='relative' key={i}>
                                    <CardContent className='flex gap-5 cursor-pointer'>
                                        <Avatar className='border' size='xl'>
                                            <AvatarImage />
                                            <AvatarFallback />
                                        </Avatar>
                                        <div className="">
                                            <h1 className=''>{item?.name}</h1>
                                            <p>{item?.email}</p>
                                            <p>{item?.role}</p>
                                        </div>
                                    </CardContent>
                                    <span className='absolute top-5 right-5'>
                                        <Settings />
                                    </span>
                                </Card>
                            )) : <p>Tidak ada data</p>
                        }
                    </section>

                </CardContent>
            </Card>
            <Card className='col-span-1'>
                <CardContent>
                    <CardHeader className='px-0!'>
                        <CardTitle>
                            Attendace Graph
                        </CardTitle>
                    </CardHeader>
                </CardContent>
            </Card>
        </div>
    )
}
