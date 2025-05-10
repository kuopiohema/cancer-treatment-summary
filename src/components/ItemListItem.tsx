import { Draggable } from '@hello-pangea/dnd'
import { ActionIcon, alpha, Card, Center, Divider, Group, Stack } from '@mantine/core'
import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { PropsWithChildren } from 'react'
import { useFormContext } from '../formContext.ts'
import { useRemoveConfirmModal } from '../hooks/useRemoveConfirmModal.tsx'

export interface ItemListItemProps extends PropsWithChildren {
    path: string
    index: number
    draggableId: string
    itemName: string
}

export default function ItemListItem({path, index, draggableId, itemName, children}: ItemListItemProps) {
    const form = useFormContext()
    const handleRemove = useRemoveConfirmModal(itemName, () => form.removeListItem(path, index))

    const cardBackgroundColor = alpha('var(--mantine-color-gray-6)', 0.2)

    return (
        <Draggable index={index} draggableId={draggableId}>
            {(provided) => (
                <Card
                    shadow="sm"
                    withBorder
                    p={0}
                    bg={cardBackgroundColor}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Group align="stretch" wrap="nowrap">
                        <Group align="stretch" gap="0" bg={cardBackgroundColor}>
                            <Center {...provided.dragHandleProps}>
                                <IconGripVertical size={18} />
                            </Center>
                            <Divider orientation="vertical" />
                        </Group>
                        <Stack gap="xs" flex="auto" py="xs">
                            {children}
                        </Stack>
                        <Group align="stretch" gap="0">
                            <ActionIcon
                                color="red"
                                mih="100%"
                                style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
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