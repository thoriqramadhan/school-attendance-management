export type User = {
    username: string,
    email: string,
    role: 'teacher' | 'student' | 'admin',
    roleId: number
}

export type Role = {
    id: number,
    name: string
}