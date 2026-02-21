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
    // all class
    revalidateTag('class', 'max')
    // all unlinked user on options
    revalidateTag('unlinked-users', 'max')
    // class user detail on id
    revalidateTag(`class-users-${id}`, 'max')


    revalidatePath('/manage-class')
    revalidatePath(`/manage-class/${id}`)

}