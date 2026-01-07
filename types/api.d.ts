interface GeneralResponse<T = undefined> {
    success: boolean,
    message?: string
    data?: T,
}
