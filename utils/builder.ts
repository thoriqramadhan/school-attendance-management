export function errorBuilder(name: string, message: string) {
    const error = new Error()
    error.name = name
    error.message = message
    throw error
}