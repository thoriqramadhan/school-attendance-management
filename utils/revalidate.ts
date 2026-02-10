"use server"

import { revalidatePath, revalidateTag } from "next/cache"

export async function revalidateUserRelated() {
    revalidateTag('users', 'max')
    revalidatePath('/manage-users')
}