import {DragDropContext, Droppable} from '@hello-pangea/dnd'
import {ActionIcon, Divider, Group, Stack, Text, Tooltip} from '@mantine/core'
import {IconPlus} from '@tabler/icons-react'
import {useFormContext} from '../formContext'
import {ItemListProps} from './ItemList'

interface NavListProps extends Omit<ItemListProps, 'addButtonText'> {
    addButtonTooltip: string
}

export default function NavList({path, itemFactory, title, addButtonTooltip, children}: NavListProps) {
    const form = useFormContext()

    return (
        <>
            <Divider my="xs" />
            <Group
                px="sm"
                pb="xs"
                justify="space-between"
            >
                <Text fw="bold">{title}</Text>
                <Tooltip label={addButtonTooltip}>
                    <ActionIcon
                        variant="subtle"
                        onClick={() => form.insertListItem(path, itemFactory())}
                    >
                        <IconPlus />
                    </ActionIcon>
                </Tooltip>
            </Group>
            <DragDropContext
                onDragEnd={({destination, source}) =>
                    destination?.index !== undefined &&
                    form.reorderListItem(path, {from: source.index, to: destination.index})
                }
            >
                <Droppable
                    droppableId={path}
                    direction="vertical"
                >
                    {(provided) => (
                        <Stack
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            gap={0}
                        >
                            {children}
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}