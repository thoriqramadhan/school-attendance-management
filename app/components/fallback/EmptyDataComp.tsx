import { Card, CardContent } from '@/components/ui/card'
import { SquareX } from 'lucide-react'
import React, { HTMLAttributes } from 'react'

interface EmptyDataFallbackProps extends HTMLAttributes<HTMLDivElement> {
    title?: string
}
export default function EmptyDataFallback({ title = 'Tidak ada data', ...props }: EmptyDataFallbackProps) {
    return (
        <Card>
            <CardContent {...props} className={`flex items-center justify-center gap-3 ${props.className}`}>
                <SquareX />
                <p>{title}</p>
            </CardContent>
        </Card>
    )
}
