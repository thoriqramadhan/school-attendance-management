import { ExistingRole } from "../users"

export type UserJwt = {
    name: string,
    id: string,
    email: string,
    role: ExistingRole
}