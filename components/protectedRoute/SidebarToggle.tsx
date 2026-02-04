'use client'
import { useSidebar } from '@/lib/context/sidebarContext'
import { PanelRightClose, PanelRightOpen, SidebarClose } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SidebarToggleProps {
    title: string,
}
export default function SidebarToggle({ }) {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(segement => segement)
    const { isOpenObject } = useSidebar()
    return (
        <span className='flex gap-x-2 h-fit items-center mb-10'>
            <span onClick={() => isOpenObject.setIsOpen(prev => !prev)} className='cursor-pointer transition-300 hover:scale-110' >
                {
                    React.cloneElement(
                        isOpenObject.isOpen ? <PanelRightOpen /> : <PanelRightClose />, { size: 25 }
                    )
                }
            </span>
            {
                segments.map((item, i) => (
                    <span key={i} className='flex gap-x-2'>
                        {item}
                        <p>{'/'}</p>
                    </span>
                ))
            }
        </span >
    )
}
