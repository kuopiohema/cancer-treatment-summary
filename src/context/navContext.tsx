import {createContext, ReactNode} from 'react'

export type Page = 'start' | 'diagnoosi' | 'hoito'

interface NavContextValue {
    currentPath: {page: Page, entityId: string}
    setCurrentPath: (page: Page, entityId?: string) => void
    currentPage: ReactNode
}

export const NavContext = createContext<NavContextValue | null>(null)