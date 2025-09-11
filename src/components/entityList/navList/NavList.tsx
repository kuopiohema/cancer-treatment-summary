import { ActionIcon, Divider, Group, Stack, Text, Tooltip } from "@mantine/core";
import { Entity } from "../../../types/form/entity";
import { EntityListProps } from "../entityListProps";
import { IconPlus } from "@tabler/icons-react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

type NavListProps<E extends Entity> = Omit<EntityListProps<E>, 'onUpdate'>

export default function NavList<E extends Entity>({items, ItemComponent, onAdd, onSwap, onRemove, title, emptyText, addButtonText}: NavListProps<E>) {
    const handleSwap = (destinationIndex: number, sourceIndex: number) => {onSwap(destinationIndex, sourceIndex)}

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
            <DragDropContext
                onDragEnd={({destination, source}) =>
                    destination?.index !== undefined &&
                    handleSwap(destination.index, source.index)
                }
            >
                <Droppable
                    droppableId={title}
                    direction="vertical"
                >
                    {(provided) => (
                        <Stack
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            gap={0}
                        >
                            {items.length === 0 && <Text px="sm" pb="xs">{emptyText}</Text>}
                            {items.map((item, index) => (
                                <ItemComponent
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onRemove={onRemove}
                                />
                            ))}
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}