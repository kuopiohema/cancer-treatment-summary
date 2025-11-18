import { Affix, Button, Group, Stack } from "@mantine/core"
import { IconArrowBackUp, IconCheck } from "@tabler/icons-react"
import { observer } from "mobx-react-lite"
import { ComponentType, use, useEffect, useMemo } from "react"
import { StoreContext } from "../../store/StoreContext"
import { EntityPageProps } from "../entities/pages/entityPageProps"
import { autorun, isObservable, runInAction } from "mobx"
import { createViewModel } from "mobx-utils"

interface EntityPageWrapperProps<E> {
    entity: E
    InnerComponent: ComponentType<EntityPageProps<E>>
}

const EntityPageWrapper = observer(<E extends object>({ entity, InnerComponent }: EntityPageWrapperProps<E>) => {  
    const { nav } = use(StoreContext)
    if (!isObservable(entity))
        throw new Error('Invalid entity object')
    
    const entityViewModel = useMemo(() => runInAction(() => createViewModel(entity)), [entity])
    
    useEffect(() => {
        autorun(() => {
            nav.setPageIsDirty(entityViewModel.isDirty)
        })
    }, [nav, entityViewModel.isDirty])

    const handleConfirm = () => entityViewModel.submit()
    const handleAbort = () => entityViewModel.reset()

    const buttonsDisabled = !entityViewModel.isDirty

    return (
        <>
            <Stack gap="sm">
                <InnerComponent entity={entityViewModel} />
            </Stack>
            <Affix position={{bottom: 10, right: 20}}>
                <Group>
                    <Button
                        onClick={handleAbort}
                        color="red"
                        leftSection={<IconArrowBackUp />}
                        disabled={buttonsDisabled}
                    >
                        Kumoa muutokset
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        color="green"
                        leftSection={<IconCheck />}
                        disabled={buttonsDisabled}
                    >
                        Hyväksy muutokset
                    </Button>
                </Group>
            </Affix>
        </>
    )
})

export default EntityPageWrapper