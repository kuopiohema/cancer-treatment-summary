import { Affix, Button, Group, Stack } from "@mantine/core"
import { IconArrowBackUp, IconCheck } from "@tabler/icons-react"
import { draft, getRootStore } from "mobx-keystone"
import { observer } from "mobx-react"
import { ComponentType, useEffect, useMemo } from "react"
import { Entity } from "../../store/entity/entity"
import { RootStore } from "../../store/store"
import { EntityComponentProps } from "../entityComponents/entityComponentProps"

interface EntityPageProps<E extends Entity> {
    entity: E
    InnerComponent: ComponentType<EntityComponentProps<E>>
}

const EntityPage = observer(<E extends Entity>({ entity, InnerComponent }: EntityPageProps<E>) => {
    const entityDraft = useMemo(() => draft(entity), [entity])

    useEffect(() => getRootStore<RootStore>(entity)?.nav.setPageIsDirty(entityDraft.isDirty), [entity, entityDraft.isDirty])

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