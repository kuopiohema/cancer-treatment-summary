import { createContext } from 'react'

export type Path = 'start' | 'diagnoosi' | 'hoito'

interface NavContextValue {
    currentPath: { path: Path, entityId: string }
    setCurrentPath: (path: Path, entityId?: string) => void
}

export const NavContext = createContext<NavContextValue | null>(null)