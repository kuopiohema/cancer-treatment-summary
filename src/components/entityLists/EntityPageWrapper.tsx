import { Affix, Button, Group, Stack } from '@mantine/core'
import { IconArrowBackUp, IconCheck } from '@tabler/icons-react'
import { reaction } from 'mobx'
import { draft, isTreeNode } from 'mobx-keystone'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { ComponentType, use, useEffect } from 'react'
import { NavContext } from '../../nav/NavContext.ts'
import { EntityPageProps } from '../entities/pages/entityPageProps'

interface EntityPageWrapperProps<E> {
    entity: E
    InnerComponent: ComponentType<EntityPageProps<E>>
}

const EntityPageWrapper = observer(<E extends object>({ entity, InnerComponent }: EntityPageWrapperProps<E>) => {
    const nav = use(NavContext)
    if (!nav)
        throw new Error('Nav context missing!')

    if (!isTreeNode(entity))
        throw new Error('Invalid entity object')

    const entityDraft = useLocalObservable(() => draft(entity))

    useEffect(
        () =>
            reaction(() => entityDraft.isDirty, isDirty => nav.setDirty(isDirty)),
        [entityDraft, nav]
    )

    const handleConfirm = () => entityDraft.commit()
    const handleAbort = () => entityDraft.reset()

    const buttonsDisabled = !entityDraft.isDirty

    return (
        <>
            <Stack gap="sm">
                <InnerComponent entity={entityDraft.data} />
            </Stack>
            <Affix position={{ bottom: 10, right: 20 }}>
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