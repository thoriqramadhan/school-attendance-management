'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface SidebarContextProps {
    isOpenObject: {
        isOpen: boolean,
        setIsOpen: Dispatch<SetStateAction<boolean>>
    }
}
const SidebarContext = createContext<SidebarContextProps | null>(null)

export default function SidebarProvider({ children }: ParentComponent) {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <SidebarContext.Provider value={{ isOpenObject: { isOpen, setIsOpen } }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = (): SidebarContextProps => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error('useSidebar must be used within SidebarProvider')
    }

    return context
}
