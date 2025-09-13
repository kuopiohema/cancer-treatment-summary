import { createContext } from "react"

export interface StoreActions {
    clear: () => void
}

export const StoreActionsContext = createContext<StoreActions | null>(null)