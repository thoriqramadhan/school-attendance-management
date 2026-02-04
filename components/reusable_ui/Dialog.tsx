'use client'
import React from 'react'
import { Dialog, DialogContent, DialogContentType, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

interface DialogComponentProps extends DialogContentType {
    title?: string,
    description?: string
    children: React.ReactNode,
    open: boolean,
    onOpenChange: (open: boolean) => void
}
export default function DialogComponent({ title, description, children, open, onOpenChange, ...props }: DialogComponentProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent {...props}>
                {
                    (title || description) &&
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                }
                {children}
            </DialogContent>
        </Dialog>
    )
}
