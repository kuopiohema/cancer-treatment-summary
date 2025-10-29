import { Affix, Button, Group, Stack } from "@mantine/core"
import { IconArrowBackUp, IconCheck } from "@tabler/icons-react"
import { draft, isTreeNode } from "mobx-keystone"
import { observer } from "mobx-react"
import { ComponentType, use, useEffect, useMemo } from "react"
import { StoreContext } from "../../store/StoreContext"
import { EntityComponentProps } from "../entities/entityComponentProps"

interface EntityPageProps<E> {
    entity: E
    InnerComponent: ComponentType<EntityComponentProps<E>>
}

const EntityPage = observer(<E extends object>({ entity, InnerComponent }: EntityPageProps<E>) => {  
    const store = use(StoreContext)
    if (!isTreeNode(entity))
        throw new Error('Invalid entity object')
    
    const entityDraft = useMemo(() => draft(entity), [entity])
    useEffect(() => store.nav.setPageIsDirty(entityDraft.isDirty), [store.nav, entityDraft.isDirty])

    const handleConfirm = () => entityDraft.commit()
    const handleAbort = () => entityDraft.reset()

    const buttonsDisabled = !entityDraft.isDirty

    return (
        <>
            <Stack gap="sm">
                <InnerComponent data={entityDraft.data} />
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

export default EntityPage