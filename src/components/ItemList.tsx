import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Button, Fieldset, Stack } from '@mantine/core'
import { PropsWithChildren } from 'react'
import { type ArrayItem, useFormContext } from '../formContext'

export interface ItemListProps extends PropsWithChildren {
    path: string
    itemFactory: () => ArrayItem
    title: string
    addButtonText: string
}

export default function ItemList({path, itemFactory, title, addButtonText, children}: ItemListProps) {
    const form = useFormContext()

    return (
        <Fieldset legend={title} my="md">
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
                            {children}
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
            <Button onClick={() => form.insertListItem(path, itemFactory())}>
                {addButtonText}
            </Button>
        </Fieldset>
    )
}