'use client'
import EmptyDataFallback from '@/app/components/fallback/EmptyDataComp'
import dynamic from 'next/dynamic'
const LinkUserDialog = dynamic(() => import('@/app/(protectedRoute)/(adminRoutes)/manage-class/_components/LinkUserDialog'), {
    loading: () => null,
    ssr: false
})
const UnlinkUserDialog = dynamic(() => import('@/app/(protectedRoute)/(adminRoutes)/manage-class/_components/UnlinkUserDialog'), {
    loading: () => null,
    ssr: false
})
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { linkUserToClassAction, unlinkUserToClassAction } from '@/lib/server_functions/manage-class/action'
import { ClassMemberView, User } from '@/types/users'
import { errorBuilder } from '@/utils/builder'
import { toggleModalState } from '@/utils/stateSetter'
import { Ellipsis, Move, Plus, Unlink } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Class } from '@/types/server_functions/manage-class'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface ManageClassDetailClientProps {
    classMembers: ClassMemberView[]
    nonLinkedUsers: User[]
    classId: string,
    classes: Class[]
}
export default function ManageClassDetailClient({ classMembers, nonLinkedUsers, classId }: ManageClassDetailClientProps) {
    const [modalState, setModalState] = useState({
        linkUser: false,
        unlinkUser: false,
    })
    const [selectedMember, setSelectedMember] = useState<ClassMemberView | null>(null)

    async function handleLinkUser(selectedUserId: string) {
        try {
            const res = await linkUserToClassAction({ userId: selectedUserId, classId })
            if (!res.success) throw errorBuilder('Failed to link user', res?.message!);
            toast.success('Success linking users')
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            toggleModalState(setModalState, 'linkUser')
        }
    }

    async function handleUnlinkUser() {
        if (!selectedMember) return
        try {
            const res = await unlinkUserToClassAction({ userId: selectedMember.user_id, classId })
            if (!res.success) throw errorBuilder('Failed to unlink user', res?.message!);
            toast.success('Success unlinking user')
        } catch (error) {
            toast.error((error as Error).message)
        }
    }
    return (
        <>
            <Card className='col-span-2'>
                <CardContent className='space-y-5'>
                    <CardHeader className='flex! px-0! justify-between flex-wrap md:grid md:grid-cols-5 items-center '>
                        <CardTitle className='md:col-span-4'>
                            Class User List
                        </CardTitle>
                        <Button className='w-full flex-wrap' onClick={() => toggleModalState(setModalState, 'linkUser')}>
                            <Plus />
                            Link User
                        </Button>
                    </CardHeader>
                    <hr className='w-full' />
                    <section className='w-full space-y-3'>
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
                                    <span className='absolute cursor-pointer top-5 right-5'>
                                        <DropdownMenu  >
                                            <DropdownMenuTrigger>
                                                <Ellipsis />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side='left'>
                                                <DropdownMenuItem variant='destructive' onClick={() => { setSelectedMember(item); toggleModalState(setModalState, 'unlinkUser') }}>
                                                    <Unlink />
                                                    Unlink User
                                                </DropdownMenuItem>
                                                <DropdownMenuItem variant='destructive'>
                                                    <Move />
                                                    Move Class
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </span>
                                </Card>
                            )) : <EmptyDataFallback />
                        }
                    </section>

                </CardContent>
            </Card>
            {modalState?.linkUser && <LinkUserDialog users={nonLinkedUsers} onSubmit={handleLinkUser} open={modalState?.linkUser} onOpenChange={() => toggleModalState(setModalState, 'linkUser')} />}

            {modalState?.unlinkUser && selectedMember && <UnlinkUserDialog open={modalState?.unlinkUser} onOpenChange={() => toggleModalState(setModalState, 'unlinkUser')} selectedMember={selectedMember} onConfirm={handleUnlinkUser} />}
        </>
    )
}
