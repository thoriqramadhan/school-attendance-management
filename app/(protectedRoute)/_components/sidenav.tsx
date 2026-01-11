'use client'
import { useSidebar } from '@/lib/context/sidebarContext'
import { cn } from '@/lib/utils'
import { Sidebar, SidebarClose, X } from 'lucide-react'
import React, { useState } from 'react'

export default function Sidenav() {
    const { isOpenObject } = useSidebar()

    return (
        <div className={cn('transition-300', isOpenObject.isOpen ? 'w-[100px] flex justify-center h-full bg-zinc-100 p-5 relative' : 'w-0')}>
        </div>
    )
}
