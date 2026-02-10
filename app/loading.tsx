import { Loader2Icon } from 'lucide-react'
import React from 'react'

export default function DefaultLoading() {
    return (
        <section className='w-full h-screen flex justify-center items-center'>
            <Loader2Icon className='animate-spin' size={50} />
        </section>
    )
}
