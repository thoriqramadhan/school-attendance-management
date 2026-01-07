import React from 'react'

interface AuthLayoutArgs {
    children: React.ReactNode
}
export default function AuthLayout({ children }: AuthLayoutArgs) {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            {children}
        </div>
    )
}
