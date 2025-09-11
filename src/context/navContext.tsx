import {createContext, Dispatch, SetStateAction} from 'react'

interface NavContextValue {
    currentPage: string
    setCurrentPage: Dispatch<SetStateAction<string>>
}

export const NavContext = createContext<NavContextValue | null>(null)