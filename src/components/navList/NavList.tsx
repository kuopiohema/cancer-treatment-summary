import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ActionIcon, Divider, Group, Stack, Text, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { observer } from "mobx-react";
import { ComponentType } from "react";
import { RemoveCallback } from "../../hooks/useEntityStore";
import { Diagnosis, DiagnosisList } from "../../store/diagnosis";
import { Entity } from "../../types/form/entity";
import { NavListItemWrapperProps } from "./navListItemWrapperProps";

interface NavListProps<E extends Entity> {
    entityList: DiagnosisList
    ItemComponent: ComponentType<NavListItemWrapperProps<Diagnosis>>
    title: string
    emptyText: string
    addButtonText: string
}

interface NavListInnerProps<E extends Entity> {
    entityList: DiagnosisList
    ItemComponent: ComponentType<NavListItemWrapperProps<Diagnosis>>
    emptyText: string
    onRemove: RemoveCallback
}

const NavListInner = observer(<E extends Entity>({ entityList, ItemComponent, emptyText, onRemove }: NavListInnerProps<E>) => (
    entityList.entities.length === 0 ?
        <Text px="sm" pb="xs">{emptyText}</Text> :
        entityList.entities.map((entity, index) => (
            <ItemComponent
                key={entity.id}
                entity={entity}
                index={index}
                onRemove={onRemove}
            />
        ))
))

const NavList = observer(<E extends Entity>({ entityList, ItemComponent, title, emptyText, addButtonText }: NavListProps<E>) => {
    const handleAdd = () => entityList.add()
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
                                ItemComponent={ItemComponent}
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