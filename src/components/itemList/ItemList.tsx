import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Button, Fieldset, Stack, Text } from '@mantine/core'
import type { ComponentType } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useFormContext } from '../../form/formContext'
import type { ListItem } from '../../form/listItem'
import type { ItemProps } from '../../types/itemProps'

export interface ItemListProps<T extends ListItem> {
    items: T[]
    path: string
    itemFactory: () => T
    ItemComponent: ComponentType<ItemProps<T>>
    title: string
    emptyText: string
    addButtonText: string
}

export default function ItemList<T extends ListItem>({items, path, itemFactory, ItemComponent, title, emptyText, addButtonText}: ItemListProps<T>) {
    const form = useFormContext()

    return (
        <Fieldset legend={title}>
            <DragDropContext
                onDragEnd={({destination, source}) =>
                    destination?.index !== undefined && form.reorderListItem(path, {
                        from: source.index,
                        to: destination.index
                    })
                }
            >
                <Droppable droppableId={path} direction="vertical">
                    {(provided) => (
                        <Stack
                            gap="md"
                            mb="md"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {items.length === 0 && <Text>{emptyText}</Text>}
                            {items.map((item, index) => (
                                <ItemComponent
                                    key={item.id}
                                    path={path}
                                    index={index}
                                    item={item}
                                />
                            ))}
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
            <Button
                leftSection={<IconPlus size={20}/>}
                onClick={() => form.insertListItem(path, itemFactory())}
            >
                {addButtonText}
            </Button>
        </Fieldset>
    )
}