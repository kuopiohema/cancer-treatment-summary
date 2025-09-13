import { PropsWithChildren, useMemo, useState } from "react"
import { NavContext } from "./navContext"
import Start from "../components/pages/Start"
import DiagnosisPage from "../components/entityList/navList/itemPages/DiagnosisPage"

export type Page = 'start' | 'diagnoosi' | ''

const NavProvider = ({children}: PropsWithChildren) => {
    const [path, setPath] = useState('start')
    const [entityId, setEntityId] = useState('')

    const setCurrentPath = (page: string, entityId?: string) => {
        setPath(page)
        setEntityId(entityId ?? '')
    }

    const currentPage = useMemo(() => {
        switch (path) {
            case 'start':
                return <Start />
            case 'diagnoosi':
                return <DiagnosisPage id={entityId} />
        }
    }, [path, entityId])

    const navContextValue = useMemo(
        () => ({
            currentPath: {page: path, entityId},
            setCurrentPath,
            currentPage
        }),
        [path, entityId, currentPage]
    )

    return (
        <NavContext value={navContextValue}>
            {children}
        </NavContext>
    )
}

export default NavProvider