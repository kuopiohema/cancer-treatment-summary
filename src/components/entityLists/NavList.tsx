import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ActionIcon, Divider, Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { observer } from "mobx-react";
import { Entity } from "../../store/entity";
import { EntityList } from "../../store/entityList";
import NavListItem from "./NavListItem";
import { EntityListProps } from "./entityListProps";

interface NavListInnerProps<E extends Entity> {
    entityList: EntityList<E>
    emptyText: string
    onRemove: (id: string) => void
}

const NavListInner = observer(<E extends Entity>({ entityList, emptyText, onRemove }: NavListInnerProps<E>) => (
    entityList.entities.length === 0 ?
        <Text px="sm" pb="xs">{emptyText}</Text> :
        entityList.entities.map((entity, index) => (
            <NavListItem
                key={entity.id}
                index={index}
                id={entity.id}
                itemName={entity.itemName}
                label={entity.label}
                sublabel={entity.sublabel}
                isSelected={entity.isSelected}
                onSelect={() => entity.select()}
                onRemove={onRemove}
            />
        ))
))

const NavList = observer(<E extends Entity>({ entityList, entityFactory, title, emptyText, addButtonText }: EntityListProps<E>) => {
    const handleAdd = () => entityList.add(entityFactory())
    const handleSwap = (destinationIndex: number, sourceIndex: number) => { entityList.swap(destinationIndex, sourceIndex) }
    const handleRemove = (id: string) => entityList.remove(id)

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
                onDragEnd={({ destination, source }) =>
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
                            <NavListInner
                                entityList={entityList}
                                emptyText={emptyText}
                                onRemove={handleRemove}
                            />
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
})

export default NavList