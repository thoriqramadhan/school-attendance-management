import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, { message: 'Password min 8 digits.' })
})