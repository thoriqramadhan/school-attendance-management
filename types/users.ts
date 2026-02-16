export type User = {
    id: string,
    name: string,
    email: string,
    role: ExistingRole,
    roleId: number | string
}
export type ExistingRole = 'teacher' | 'student' | 'admin'
export type Role = {
    id: number,
    name: string
}
export type ClassMemberView = {
    class_name: string,
    name: string,
    role: ExistingRole,
    email: string,
    user_id: string,
    class_id: string
}