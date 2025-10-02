import { createContext } from "react"

export type Path = 'start' | 'diagnoses' | 'treatments' | 'chemotherapies' | 'radiotherapies' | 'procedures' | 'stemCellTransplants'

export interface NavLocation {
    path: Path
    entityId: string
}

export interface NavActions {
    setLocation: (path: Path, entityId: string) => void
    reset: () => void
}

export const NavContext = createContext<NavLocation & NavActions | null>(null)