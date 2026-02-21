export const cleanString = (text: string) => {
    if (text.length <= 0) return;
    return text.trim()
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
        .replace(/_+/g, '_')
}