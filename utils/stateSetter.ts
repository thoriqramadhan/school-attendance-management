import { Dispatch, SetStateAction } from "react";

export function toggleModalState<Struct extends Record<string, boolean>>(setter: Dispatch<SetStateAction<Struct>>, key: keyof Struct) {
    setter(prev => ({ ...prev, [key]: !prev[key] }))
}