'use client'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/auth'
import { LogOut } from 'lucide-react'
import React from 'react'

export default function LogoutBtn() {
    return (
        <Button className='w-full' onClick={async () => logout()}><LogOut />Sign Out</Button>
    )
}
