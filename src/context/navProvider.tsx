import { PropsWithChildren, useMemo, useState } from "react"
import { NavContext, Path } from "./navContext"

const NavProvider = ({ children }: PropsWithChildren) => {
    const [path, setPath] = useState<Path>('start')
    const [entityId, setEntityId] = useState('')

    const setCurrentPath = (path: Path, entityId?: string) => {
        setPath(path)
        setEntityId(entityId ?? '')
    }

    const navContextValue = useMemo(
        () => ({
            currentPath: { path, entityId },
            setCurrentPath
        }),
        [path, entityId]
    )

    return (
        <NavContext value={navContextValue}>
            {children}
        </NavContext>
    )
}

export default NavProvider