'use client'

import React from 'react'
import DialogComponent from '@/components/reusable_ui/Dialog'
import { DialogFooter } from '@/components/ui/dialog'
import { Button, ButtonVariant } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'

interface ConfirmationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    onConfirm: () => void
    confirmText?: string
    cancelText?: string
    variant?: VariantProps<ButtonVariant>['variant']
}

export default function ConfirmationModal({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant,
}: ConfirmationModalProps) {
    return (
        <DialogComponent open={open} onOpenChange={onOpenChange} title={title} description={description} showCloseButton={false} className="sm:max-w-md">
            <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    {cancelText}
                </Button>
                <Button
                    variant={variant}
                    onClick={() => {
                        onConfirm()
                        onOpenChange(false)
                    }}
                >
                    {confirmText}
                </Button>
            </DialogFooter>
        </DialogComponent>
    )
}
