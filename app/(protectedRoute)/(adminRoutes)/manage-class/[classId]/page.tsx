import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllUsersClass, getNonLinkedUsers } from '@/lib/server_functions/manage-class/queries';
import { Plus, Settings } from 'lucide-react';
import React from 'react'
import ManageClassDetailClient from './MageClassDetailClient';

export default async function ClassDetail({
    params
}: { params: Promise<{ classId: string }> }) {
    const { classId } = await params
    const classMembers = await getAllUsersClass(classId);
    const nonLinkedUsers = await getNonLinkedUsers()


    return (
        <div className="w-full grid grid-cols-3 gap-5">
            <ManageClassDetailClient classId={classId} nonLinkedUsers={nonLinkedUsers} classMembers={classMembers} />
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
