import { Draggable } from "@hello-pangea/dnd"
import { ActionIcon, alpha, Card, Center, Divider, Group, Stack, Text } from "@mantine/core"
import { IconGripVertical, IconTrash } from "@tabler/icons-react"
import { ComponentType, useEffect, useState } from "react"
import { RemoveCallback, UpdateCallback } from "../../hooks/useEntityStore"
import { useRemoveConfirmModal } from "../../hooks/useRemoveConfirmModal"
import { Entity } from "../../types/form/entity"

export interface EntityListItemInnerProps<E extends Entity> {
    item: E
    onUpdate: <K extends keyof E, V extends E[K]>(key: K, value: V) => void
}

interface EntityListItemProps<E extends Entity> {
    index: number
    item: E
    InnerComponent: ComponentType<EntityListItemInnerProps<E>>
    onUpdate: UpdateCallback<E>
    onRemove: RemoveCallback
    itemName: string
}

const EntityListItem = <E extends Entity>({ index, item, InnerComponent, onUpdate, onRemove, itemName }: EntityListItemProps<E>) => {
    const [data, setData] = useState<E>(item)
    useEffect(() => setData(item), [item])

    const handleRemove = useRemoveConfirmModal(itemName, () => onRemove(item.id))

    if (!data)
        return (<Text>Virhe: näytettävää kohdetta ei löydy!</Text>)

    const handleConfirm = () => onUpdate(data)
    const handleAbort = () => setData(item)
    const handleUpdate = <K extends keyof E, V extends E[K]>(key: K, value: V) => {
        setData({ ...data, [key]: value })
    }

    const isDirty = data !== item

    const cardBackgroundColor = alpha('var(--mantine-color-gray-6)', 0.2)

    return (
        <Draggable index={index} draggableId={item.id}>
            {(provided) => (
                <Card
                    shadow="sm"
                    withBorder
                    p={0}
                    bg={cardBackgroundColor}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Group
                        align="stretch"
                        wrap="nowrap"
                    >
                        <Group
                            align="stretch"
                            gap="0"
                            bg={cardBackgroundColor}
                        >
                            <Center {...provided.dragHandleProps}>
                                <IconGripVertical size={18} />
                            </Center>
                            <Divider orientation="vertical" />
                        </Group>
                        <Stack
                            gap="xs"
                            flex="auto"
                            py="xs"
                        >
                            <InnerComponent
                                item={data}
                                onUpdate={handleUpdate}
                            />
                        </Stack>
                        <Group
                            align="stretch"
                            gap="0"
                        >
                            <ActionIcon
                                color="red"
                                mih="100%"
                                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                onClick={handleRemove}
                            >
                                <IconTrash size={22} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Card>
            )}
        </Draggable>
    )
}

export default EntityListItem