import { ActionIcon, Divider, Group, Stack, Text, Tooltip } from "@mantine/core";
import { Entity } from "../../../types/form/entity";
import { EntityListProps } from "../entityListProps";
import { IconPlus } from "@tabler/icons-react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const NavList = <E extends Entity>({list, ItemComponent, title, emptyText, addButtonText}: EntityListProps<E>) => {
    const handleAdd = () => list.actions.add()
    const handleSwap = (destinationIndex: number, sourceIndex: number) => {list.actions.swap(destinationIndex, sourceIndex)}
    const handleRemove = (id: string) => list.actions.remove(id)

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
                        onClick={handleAdd}
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
                            {list.entities.length === 0 && <Text px="sm" pb="xs">{emptyText}</Text>}
                            {list.entities.map((item, index) => (
                                <ItemComponent
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onRemove={handleRemove}
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

export default NavList