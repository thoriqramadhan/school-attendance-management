'use client'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useSidebar } from '@/lib/context/sidebarContext'
import { cn } from '@/lib/utils'
import { GraduationCap, Home, Sidebar, SidebarClose, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

export default function Sidenav() {
    const { isOpenObject } = useSidebar()
    const pathname = usePathname()

    const sidebarItem = [
        {
            route: 'dashboard',
            icon: <Home />,
            roles: ['ADMIN', 'USER']
        },
        {
            route: 'manage-users',
            icon: <User />,
            roles: ['ADMIN']
        },
        {
            route: 'manage-class',
            icon: <GraduationCap />,
            roles: ['ADMIN']
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
                            <Link href={`/${item.route}`} key={i} className={cn(!isOpenObject?.isOpen && 'hidden')}>
                                {React.cloneElement(item.icon, { color: pathname.includes(item.route) ? 'blue' : 'black' })}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent><p className='capitalize'>{item?.route?.replaceAll('-', ' ')}</p></TooltipContent>
                    </Tooltip>
                ))
            }
        </div>
    )
}
