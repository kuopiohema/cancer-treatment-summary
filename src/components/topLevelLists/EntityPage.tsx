import { Button, Divider, Group, Stack } from "@mantine/core"
import { IconArrowBackUp, IconCheck } from "@tabler/icons-react"
import { draft, getRootStore } from "mobx-keystone"
import { observer } from "mobx-react"
import { ComponentType, useEffect, useMemo } from "react"
import { Entity } from "../../store/entity"
import { EntityComponentProps } from "../entityComponents/entityComponentProps"
import { Store } from "../../store/store"

interface EntityPageProps<E extends Entity> {
    entity: E
    InnerComponent: ComponentType<EntityComponentProps<E>>
    fullWidth?: boolean
}

const EntityPage = observer(<E extends Entity>({ entity, InnerComponent, fullWidth }: EntityPageProps<E>) => {
    const entityDraft = useMemo(() => draft(entity), [entity])

    useEffect(() => getRootStore<Store>(entity)?.nav.setPageIsDirty(entityDraft.isDirty), [entity, entityDraft.isDirty])

    const handleConfirm = () => entityDraft.commit()
    const handleAbort = () => entityDraft.reset()

    const buttonsDisabled = !entityDraft.isDirty

    return (
        <Stack
            gap="sm"
            w={fullWidth ? undefined : '600px'}
        >
            <InnerComponent data={entityDraft.data} />
            <Divider />
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
        </Stack>
    )
})

export default EntityPage