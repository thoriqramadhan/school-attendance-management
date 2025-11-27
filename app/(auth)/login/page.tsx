import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WavyBackground } from '@/components/ui/wavy-background'
import React from 'react'

export default function LoginPage() {
    return (
        <Card className='w-full md:w-[500px]'>
            <CardContent className='w-full  grid grid-cols-1'>
                <div className="">
                    {/* <WavyBackground /> */}
                </div>
                <div className="">
                    <p>test</p>
                </div>
            </CardContent>
        </Card>
    )
}
