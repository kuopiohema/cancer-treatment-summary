import { createContext } from "react"

export interface StoreActions {
    clear: () => void
    save: () => string
}

export const StoreActionsContext = createContext<StoreActions | null>(null)