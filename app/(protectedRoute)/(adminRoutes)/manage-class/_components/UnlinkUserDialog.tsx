'use client'

import ConfirmationModal from '@/app/components/ConfirmationModal'
import { ClassMemberView } from '@/types/users'

interface UnlinkUserDialogProps {
    open: boolean
    onOpenChange: () => void
    selectedMember: ClassMemberView
    onConfirm: () => void
}

export default function UnlinkUserDialog({ open, onOpenChange, selectedMember, onConfirm }: UnlinkUserDialogProps) {
    return (
        <ConfirmationModal
            open={open}
            onOpenChange={onOpenChange}
            title='Unlink User'
            description={`Are you sure you want to unlink ${selectedMember?.name} from this class?`}
            confirmText='Unlink'
            variant='destructive'
            onConfirm={onConfirm}
        />
    )
}
