import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { alpha, Button, Paper, Stack, Title } from "@mantine/core";
import { PropsWithChildren } from "react";
import { useFormContext } from "../formContext";

export interface ItemListProps extends PropsWithChildren {
    path: string
    itemFactory: () => unknown
    title: string
    addButtonText: string
}

export default function ItemList({ path, itemFactory, title, addButtonText, children }: ItemListProps) {
    const form = useFormContext()

    const paperBackgroundColor = alpha('var(--mantine-color-gray-6)', 0.2)

    return (
        <Paper shadow="sm" withBorder p="md" bg={paperBackgroundColor}>
            <Title order={2}>{title}</Title>
            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    destination?.index !== undefined && form.reorderListItem(path, { from: source.index, to: destination.index })

                }
            >
                <Droppable droppableId={path} direction="vertical">
                    {(provided) => (
                        <Stack
                            gap="md"
                            my="md"
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
        </Paper>
    )
}