export type User = {
    id: string,
    name: string,
    email: string,
    role: ExistingRole,
    roleId: number
}
export type ExistingRole = 'teacher' | 'student' | 'admin'
export type Role = {
    id: number,
    name: string
}