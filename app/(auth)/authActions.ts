"use server"

import { parse } from "path";
import { loginSchema, registerSchema } from "./authSchemas";
import { register } from "@/lib/auth";


export async function signUpAction(data: unknown): Promise<GeneralResponse> {
    try {
        const parsed = registerSchema.safeParse(data)
        if (!parsed.success) {
            return {
                success: false,
                message: parsed.error.message
            }
        }
        const { email, password, name } = parsed.data
        await register({ email, name, password })
        return {
            success: true,
            message: 'Berhasil Sign In'
        }
    } catch (error: any) {
        if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
            return {
                success: false,
                message: 'Email sudah terdaftar'
            }
        }
        return {
            success: false,
            message: error?.message
        }
    }

}