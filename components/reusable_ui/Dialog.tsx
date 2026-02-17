'use client'
import React from 'react'
import { Dialog, DialogContent, DialogContentType, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { VisuallyHidden } from 'radix-ui'

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
            <DialogContent className='text-black' {...props}>
                {title ? (
                    <DialogTitle className='text-black'>{title}</DialogTitle>
                ) : (
                    <DialogTitle className='hidden'>Dialog</DialogTitle>
                )}

                {description && (
                    <DialogDescription>{description}</DialogDescription>
                )}
                {children}
            </DialogContent>
        </Dialog>
    )
}
