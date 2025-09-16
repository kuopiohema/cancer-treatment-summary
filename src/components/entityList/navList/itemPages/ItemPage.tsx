import { Button, Divider, Group, Stack, Text } from "@mantine/core"
import { Entity } from "../../../../types/form/entity"
import { ComponentType, useEffect, useMemo, useState } from "react"
import { ItemPageInnerProps } from "./itemPageInnerProps"
import { EntityList } from "../../../../hooks/useEntityList"
import { IconArrowBackUp, IconCheck } from "@tabler/icons-react"

interface ItemPageProps<E extends Entity> {
    id: string
    fullWidth?: boolean
    entityList: EntityList<E>
    InnerComponent: ComponentType<ItemPageInnerProps<E>>
}

const ItemPage = <E extends Entity>({id, fullWidth, entityList, InnerComponent}: ItemPageProps<E>) => {    
    const initialData = useMemo(
        () => entityList.entities.find(entity => entity.id === id),
        [entityList, id]
    )

    const [data, setData] = useState<E | undefined>()
    useEffect(() => setData(initialData), [initialData])

    if (!data)
        return (<Text>Virhe: näytettävää kohdetta ei löydy!</Text>)

    const handleConfirm = () => entityList.actions.update(data)
    const handleAbort = () => setData(initialData)
    const handleUpdate = <K extends keyof E, V extends E[K]>(key: K, value: V) => {
        setData({...data, [key]: value})
    }

    const isDirty = data !== initialData

    return (
        <Stack
            gap="sm"
            w={fullWidth ? undefined : '600px'}
        >
            <InnerComponent
                data={data}
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