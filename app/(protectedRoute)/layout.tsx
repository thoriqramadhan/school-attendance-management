import Sidenav from '@/app/(protectedRoute)/_components/sidenav'
import SidebarToggle from '@/components/protectedRoute/SidebarToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import SidebarProvider from '@/lib/context/sidebarContext'
import LogoutBtn from './_components/LogoutBtn'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function ProtectedLayout({ children }: ParentComponent) {

    return (
        <section className='w-full h-screen flex'>
            <SidebarProvider>
                <TooltipProvider>
                    <Sidenav />
                    <section className="flex-1 flex flex-col p-5">
                        <div className="w-full flex justify-between  mb-10 items-center">
                            <SidebarToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger className='cursor-pointer'>
                                    <Avatar>
                                        <AvatarImage />
                                        <AvatarFallback />
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-full'>
                                    <LogoutBtn />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {children}
                    </section>
                </TooltipProvider>
            </SidebarProvider>
        </section>
    )
}
