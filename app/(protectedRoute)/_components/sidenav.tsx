'use client'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useSidebar } from '@/lib/context/sidebarContext'
import { cn } from '@/lib/utils'
import { ExistingRole } from '@/types/users'
import { Book, GraduationCap, Home, Sidebar, SidebarClose, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

type SidebarStuct = {
    route: string,
    icon?: React.ReactElement,
    roles: ExistingRole[]
}
export default function Sidenav() {
    const { isOpenObject } = useSidebar()
    const pathname = usePathname()

    const sidebarItem: SidebarStuct[] = [
        {
            route: 'dashboard',
            icon: <Home />,
            roles: ['admin', 'student']
        },
        {
            route: 'manage-users',
            icon: <User />,
            roles: ['admin']
        },
        {
            route: 'manage-class',
            icon: <GraduationCap />,
            roles: ['admin']
        },
        {
            route: 'manage-subjects',
            icon: <Book />,
            roles: ['admin']
        }
    ]

    // console.log(sidebarItem.map(item => console.log(pathname.includes(item.route))
    // ));

    return (
        <div className={cn('transition-300', isOpenObject.isOpen ? 'w-[100px] flex items-center space-y-10 h-full bg-zinc-100 p-10 relative flex-col' : 'w-0 ')}>
            {
                sidebarItem.map((item, i) => (
                    <Tooltip key={i}>
                        <TooltipTrigger className='cursor-pointer' asChild>
                            <Link href={`/${item.route}`} key={i} className={cn(!isOpenObject?.isOpen && 'hidden')} prefetch={true}>
                                {item.icon && React.cloneElement(item.icon as React.ReactElement<{ color?: string }>, { color: pathname.includes(item.route) ? 'blue' : 'black' })}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent><p className='capitalize'>{item?.route?.replaceAll('-', ' ')}</p></TooltipContent>
                    </Tooltip>
                ))
            }
        </div>
    )
}
