import { createContext } from 'react'
import type { Entity } from '../store/entities/entity.ts'

export type Page = 'help' | 'entity' | 'foreignBodies' | 'adverseEffects' | 'followup' | 'signature'

interface NavContextValue {
    currentPage: Page,
    currentEntity: Entity | undefined,
    pageIsDirty: boolean,
    selectPage: (page: Page) => void,
    selectEntity: (entity: Entity) => void
    setDirty: (dirty: boolean) => void
}

export const NavContext = createContext<NavContextValue | undefined>(undefined)