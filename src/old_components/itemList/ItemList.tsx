import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Button, Fieldset, Stack, Text } from '@mantine/core'
import type { ComponentType } from 'react'
import { IconPlus } from '@tabler/icons-react'
import type { Entity } from '../../types/form/entity'
import type { ItemProps } from '../../types/itemProps'

export interface ItemListProps<T extends Entity> {
    items: T[]
    path: string
    ItemComponent: ComponentType<ItemProps<T>>
    title: string
    emptyText: string
    addButtonText: string
    onAdd: () => void
}

export default function ItemList<T extends Entity>({items, path, ItemComponent, title, emptyText, addButtonText, onAdd}: ItemListProps<T>) {
    return (
        <Fieldset legend={title}>
{/*            <DragDropContext
                onDragEnd={({destination, source}) =>
                    destination?.index !== undefined && form.reorderListItem(path, {
                        from: source.index,
                        to: destination.index
                    })
                }
            >
                <Droppable droppableId={path} direction="vertical">
                    {(provided) => (*/}
                        <Stack
                            gap="md"
                            mb="md"
                            //{...provided.droppableProps}
                            //ref={provided.innerRef}
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
                            {/*provided.placeholder*/}
                        </Stack>
                    {/*)}*/}
                {/*</Droppable>
            </DragDropContext>*/}
            <Button
                leftSection={<IconPlus size={20}/>}
                onClick={onAdd}
            >
                {addButtonText}
            </Button>
        </Fieldset>
    )
}