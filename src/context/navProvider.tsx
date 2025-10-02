import { PropsWithChildren, useMemo, useState } from "react";
import { NavActions, NavContext, NavLocation, Path } from "./navContext";

const defaultLocation: NavLocation = {path: 'start', entityId: ''}

const NavProvider = ({ children }: PropsWithChildren) => {    
    const [path, setPath] = useState<Path>(defaultLocation.path)
    const [entityId, setEntityId] = useState(defaultLocation.entityId)

    const contextValue: NavLocation & NavActions = useMemo(() => {
        const setLocation = (path: Path, entityId: string) => {
            setPath(path)
            setEntityId(entityId)
        }

        const reset = () => {
            setLocation(defaultLocation.path, defaultLocation.entityId)
        }

        return { path, entityId, setLocation, reset }
    }, [path, entityId, setPath, setEntityId])

    return (
        <NavContext value={contextValue}>
            {children}
        </NavContext>
    )
}

export default NavProvider