import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../formContext";
import { PropsWithChildren } from "react";
import { alpha, Button, Paper, Stack, Title } from "@mantine/core";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

interface ItemListProps extends PropsWithChildren {
    form: UseFormReturnType<FormValues>
    formPath: string
    itemFactory: () => unknown
    title: string
    addButtonText: string
}

export default function ItemList({ form, formPath, itemFactory, title, addButtonText, children }: ItemListProps) {
    const paperBackgroundColor = alpha('var(--mantine-color-gray-6)', 0.2)

    return (
        <Paper shadow="sm" withBorder p="md" bg={paperBackgroundColor}>
            <Title order={2}>{title}</Title>
            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    destination?.index !== undefined && form.reorderListItem(formPath, { from: source.index, to: destination.index })

                }
            >
                <Droppable droppableId={formPath} direction="vertical">
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
            <Button onClick={() => form.insertListItem(formPath, itemFactory())}>
                {addButtonText}
            </Button>
        </Paper>
    )
}