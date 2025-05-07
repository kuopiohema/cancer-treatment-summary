import {DragDropContext, Droppable} from '@hello-pangea/dnd'
import {ActionIcon, Divider, Group, Stack, Text, Tooltip} from '@mantine/core'
import {IconPlus} from '@tabler/icons-react'
import {useFormContext} from '../formContext'
import {ItemListProps} from './ItemList'
import {NavContext} from '../navContext.tsx'
import {use} from 'react'
import getPageKey from '../utils/getPageKey.ts'

interface NavListProps extends Omit<ItemListProps, 'addButtonText'> {
    addButtonTooltip: string
}

export default function NavList({path, itemFactory, title, addButtonTooltip, children}: NavListProps) {
    const nav = use(NavContext)!

    const form = useFormContext()

    const handleAdd = () => {
        const newItem = itemFactory()
        form.insertListItem(path, newItem)
        nav?.setCurrentPage(getPageKey(path, newItem.id))
    }

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
                        onClick={handleAdd}
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