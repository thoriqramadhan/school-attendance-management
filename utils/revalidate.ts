"use server"

import { revalidatePath, revalidateTag } from "next/cache"

export async function revalidateUserRelated() {
    revalidateTag('users', 'max')
    revalidatePath('/manage-users')
}

export async function revalidateClassRelated() {
    revalidateTag('class', 'max')
    revalidatePath('/manage-class')
}
export async function revalidateClassMembersRelated(id: string | number) {
    revalidateTag('class', 'max')
    revalidateTag('unlinked-users', 'max')
    revalidateTag(`class-users-${id}`, 'max')
    revalidatePath('/manage-class')
    revalidatePath(`/manage-class/${id}`)

}