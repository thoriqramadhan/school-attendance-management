"use server"

import { parse } from "path";
import { loginSchema, registerSchema } from "./authSchemas";
import { login, register } from "@/lib/auth";


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
            message: 'Berhasil Register'
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

export async function loginAction(data: unknown): Promise<GeneralResponse> {
    try {
        const parsed = loginSchema.safeParse(data)
        if (!parsed.success) {
            return {
                success: false,
                message: parsed.error.message
            }
        }
        const { email, password } = parsed.data
        const res = await login({ email, password })
        return res
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message
        }
    }
}