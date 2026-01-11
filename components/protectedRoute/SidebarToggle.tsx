'use client'
import { useSidebar } from '@/lib/context/sidebarContext'
import { PanelRightClose, PanelRightOpen, SidebarClose } from 'lucide-react'
import React from 'react'

interface SidebarToggleProps {
    title: string,
}
export default function SidebarToggle({ title }: SidebarToggleProps) {
    const { isOpenObject } = useSidebar()
    return (
        <span className='flex gap-x-2 h-fit items-center  p-5'>
            <span onClick={() => isOpenObject.setIsOpen(prev => !prev)} className='cursor-pointer transition-300 hover:scale-110' >
                {
                    React.cloneElement(
                        isOpenObject.isOpen ? <PanelRightOpen /> : <PanelRightClose />, { size: 25 }
                    )
                }
            </span>
            <p>{title}</p>
        </span >
    )
}
