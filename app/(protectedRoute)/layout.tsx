import Sidenav from '@/app/(protectedRoute)/_components/sidenav'
import SidebarToggle from '@/components/protectedRoute/SidebarToggle'
import SidebarProvider from '@/lib/context/sidebarContext'

export default function ProtectedLayout({ children }: ParentComponent) {

    return (
        <section className='w-full h-screen flex'>
            <SidebarProvider>
                <Sidenav />
                <div className="flex-1 flex flex-col">
                    <SidebarToggle />
                    {children}
                </div>
            </SidebarProvider>
        </section>
    )
}
