import { type PropsWithChildren, useState } from 'react'
import { rejectChangesConfirmModal } from '../modals/rejectChangesConfirmModal.tsx'
import type { Entity } from '../store/entities/entity.ts'
import { NavContext, type Page } from './NavContext.ts'

const NavProvider = ({ children }: PropsWithChildren) => {
    const [currentPage, setCurrentPage] = useState<Page>('help')
    const [currentEntity, setCurrentEntity] = useState<Entity | undefined>(undefined)
    const [pageIsDirty, setPageIsDirty] = useState(false)

    const navigate = (page: Page, entity?: Entity) => {
        setCurrentPage(page)
        if (page !== 'entity' || !entity)
            setCurrentEntity(undefined)
        else
            setCurrentEntity(entity)
    }

    const tryNavigate = (page: Page, entity?: Entity) => {
        const action = () => navigate(page, entity)
        if (!pageIsDirty)
            action()
        else
            rejectChangesConfirmModal(action)
    }

    const selectPage = (page: Page) => tryNavigate(page)

    const selectEntity = (entity: Entity) => tryNavigate('entity', entity)

    const setDirty = (dirty: boolean) => setPageIsDirty(dirty)

    return <NavContext value={{
        currentPage,
        currentEntity,
        pageIsDirty,
        selectPage,
        selectEntity,
        setDirty
    }}>
        {children}
    </NavContext>
}

export default NavProvider