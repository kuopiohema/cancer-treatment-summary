import { Button, Fieldset, Stack, Text } from "@mantine/core"
import { Entity } from "../../types/form/entity"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { IconPlus } from "@tabler/icons-react"
import { ComponentType } from "react"
import { EntityStore } from "../../hooks/useEntityStore"
import EntityListItem, { EntityListItemInnerProps } from "./EntityListItem"

interface EntityListProps<E extends Entity> {
    entityStore: EntityStore<E>
    ItemComponent: ComponentType<EntityListItemInnerProps<E>>
    title: string
    emptyText: string
    addButtonText: string
}

const EntityList = <E extends Entity>({entityStore, ItemComponent, title, emptyText, addButtonText}: EntityListProps<E>) => {
    const handleAdd = () => entityStore.actions.add()
    const handleSwap = (destinationIndex: number, sourceIndex: number) => {entityStore.actions.swap(destinationIndex, sourceIndex)}
    const handleUpdate = (item: E) => entityStore.actions.update(item)
    const handleRemove = (id: string) => entityStore.actions.remove(id)

    return (
        <Fieldset legend={title}>
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
                            gap="md"
                            mb="md"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {entityStore.entities.length === 0 && <Text>{emptyText}</Text>}
                            {entityStore.entities.map((item, index) => (
                                <Text key={item.id}>{item.id}</Text>
                                /*<EntityListItem
                                    key={item.id}
                                    index={index}
                                    item={item}
                                    InnerComponent={ItemComponent}
                                    onUpdate={handleUpdate}
                                    onRemove={() => handleRemove(item.id)}
                                />*/
                            ))}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
            <Button
                leftSection={<IconPlus size={20} />}
                onClick={handleAdd}
            >
                {addButtonText}
            </Button>
        </Fieldset>
    )
}

export default EntityList