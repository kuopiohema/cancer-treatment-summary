import { ActionIcon, Divider, Group, Stack, Text, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import type { Entity } from '../../types/form/entity.ts'
import { ItemListProps } from '../itemList/ItemList.tsx'

export default function NavList<T extends Entity>({items, path, ItemComponent, title, emptyText, addButtonText, onAdd}: ItemListProps<T>) {
    return (
        <>
            <Divider my="xs" />
            <Group
                px="sm"
                pb="xs"
                justify="space-between"
            >
                <Text fw="bold">{title}</Text>
                <Tooltip label={addButtonText}>
                    <ActionIcon
                        variant="subtle"
                        onClick={onAdd}
                    >
                        <IconPlus />
                    </ActionIcon>
                </Tooltip>
            </Group>
            {/*<DragDropContext
                onDragEnd={({destination, source}) =>
                    destination?.index !== undefined &&
                    form.reorderListItem(path, {from: source.index, to: destination.index})
                }
            >
                <Droppable
                    droppableId={path}
                    direction="vertical"
                >
                    {(provided) => (*/}
                        <Stack
                            //{...provided.droppableProps}
                            //ref={provided.innerRef}
                            gap={0}
                        >
                            {items.length === 0 && <Text px="sm" pb="xs">{emptyText}</Text>}
                            {items.map((item, index) => (
                                <ItemComponent
                                    key={item.id}
                                    path={path}
                                    item={item}
                                    index={index}
                                />
                            ))}
                            {/*provided.placeholder*/}
                        </Stack>
                    {/*})}
                </Droppable>
            </DragDropContext>*/}
        </>
    )
}