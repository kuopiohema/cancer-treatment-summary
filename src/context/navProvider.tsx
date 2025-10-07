import { PropsWithChildren, useMemo, useState } from "react";
import { NavActions, NavContext, NavLocation, Path } from "./navContext";
import { rejectChangesConfirmModal } from "../modals/rejectChangesConfirmModal";

const defaultLocation: NavLocation = { path: 'start', entityId: '' }

const NavProvider = ({ children }: PropsWithChildren) => {
    const [path, setPath] = useState<Path>(defaultLocation.path)
    const [entityId, setEntityId] = useState(defaultLocation.entityId)
    const [isDirty, setIsDirty] = useState(false)

    const confirmedSetLocation = (path: Path, entityId: string) => {
        setPath(path)
        setEntityId(entityId)
    }

    const contextValue: NavLocation & NavActions = useMemo(() => {
        const navigateTo = (path: Path, entityId: string) => {
            if (!isDirty) {
                confirmedSetLocation(path, entityId)
            } else {
                rejectChangesConfirmModal(() => confirmedSetLocation(path, entityId))
            }
        }

        const reset = () => {
            navigateTo(defaultLocation.path, defaultLocation.entityId)
        }

        return { path, entityId, navigateTo, setIsDirty, reset }
    }, [path, entityId, isDirty, setIsDirty])

    return (
        <NavContext value={contextValue}>
            {children}
        </NavContext>
    )
}

export default NavProvider