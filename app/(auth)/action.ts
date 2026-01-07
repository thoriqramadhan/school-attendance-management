"use server"

import { parse } from "path";
import { loginSchema } from "./schema";


export async function signUpAction(data: unknown): Promise<GeneralResponse> {
    const parsed = loginSchema.safeParse(data)
    if (!parsed.success) {
        return {
            success: false,
            error: {
                name: 'Invalid Input',
                message: parsed.error.message
            }
        }
    }
    return {
        success: true
    }

}