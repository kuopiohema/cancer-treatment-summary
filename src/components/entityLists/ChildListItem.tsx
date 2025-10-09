import { Draggable } from "@hello-pangea/dnd"
import { ActionIcon, alpha, Card, Center, Divider, Group, Stack } from "@mantine/core"
import { IconGripVertical, IconTrash } from "@tabler/icons-react"
import { MouseEventHandler, PropsWithChildren } from "react"
import { removeConfirmModal } from "../../modals/removeConfirmModal"

interface ChildListItemProps extends PropsWithChildren {
    index: number
    id: string
    itemName: string
    onRemove: (id: string) => void
}

const ChildListItem = ({ index, id, itemName, onRemove, children }: ChildListItemProps) => {
    const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
        removeConfirmModal(itemName, () => onRemove(id))
        e.stopPropagation()
    }

    const cardBackgroundColor = alpha('var(--mantine-color-gray-6)', 0.2)

    return (
        <Draggable
            index={index}
            draggableId={id}
        >
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
                            {children}
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

export default ChildListItem