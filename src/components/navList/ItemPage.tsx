import { Button, Divider, Group, Stack } from "@mantine/core"
import { IconArrowBackUp, IconCheck } from "@tabler/icons-react"
import equal from "fast-deep-equal"
import { PrimitiveAtom, useAtom } from "jotai"
import { ComponentType, useEffect, useState } from "react"
import { Entity } from "../../types/form/entity"
import { ItemPageInnerProps } from "./itemPageInnerProps"

interface ItemPageProps<E extends Entity> {
    entityAtom: PrimitiveAtom<E>
    InnerComponent: ComponentType<ItemPageInnerProps<E>>
    fullWidth?: boolean
}

const ItemPage = <E extends Entity>({ entityAtom, InnerComponent, fullWidth }: ItemPageProps<E>) => {
    const [entity, setEntity] = useAtom(entityAtom)

    const [data, setData] = useState<E>(entity)
    useEffect(() => setData(entity), [entity])

    const handleConfirm = () => setEntity(data)
    const handleAbort = () => setData(entity)
    const handleUpdate = <K extends keyof E, V extends E[K]>(key: K, value: V) => {
        setData({ ...data, [key]: value })
    }

    const isDirty = !equal(entity, data)

    return (
        <Stack
            gap="sm"
            w={fullWidth ? undefined : '600px'}
        >
            <InnerComponent
                item={data}
                onUpdate={handleUpdate}
            />
            <Divider />
            <Group>
                <Button
                    onClick={handleAbort}
                    color="red"
                    leftSection={<IconArrowBackUp />}
                    disabled={!isDirty}
                >
                    Kumoa muutokset
                </Button>
                <Button
                    onClick={handleConfirm}
                    color="green"
                    leftSection={<IconCheck />}
                    disabled={!isDirty}
                >
                    Hyväksy muutokset
                </Button>
            </Group>
        </Stack>
    )
}

export default ItemPage