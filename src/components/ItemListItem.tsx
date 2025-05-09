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
                    px={0}
                    py="xs"
                    bg={cardBackgroundColor}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Group align="stretch">
                        <Group gap="0">
                            <Center {...provided.dragHandleProps}>
                                <IconGripVertical size={18} />
                            </Center>
                            <Divider orientation="vertical" />
                        </Group>
                        <Stack gap="xs" flex="auto">
                            {children}
                        </Stack>
                        <Group gap="0">
                        <Divider orientation="vertical" />
                        <ActionIcon
                            color="red"
                            variant="subtle"
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