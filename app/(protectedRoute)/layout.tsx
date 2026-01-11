import Sidenav from '@/app/(protectedRoute)/_components/sidenav'
import SidebarProvider from '@/lib/context/sidebarContext'

export default function ProtectedLayout({ children }: ParentComponent) {

    return (
        <section className='w-full h-screen flex'>
            <SidebarProvider>
                <Sidenav />
                {children}
            </SidebarProvider>
        </section>
    )
}
