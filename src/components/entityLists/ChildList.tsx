import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { Button, Fieldset, Stack, Text } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { observer } from "mobx-react"
import { Entity } from "../../store/entity/entity"
import { EntityListProps } from "./entityListProps"
import { ComponentType } from "react"
import { EntityComponentProps } from "../entities/entityComponentProps"
import { EntityList } from "../../store/entityList"
import ChildListItem from "./ChildListItem"

interface ChildListInnerProps<E extends Entity> {
    entityList: EntityList<E>
    emptyText: string
    onRemove: (id: string) => void
    ListItemComponent: ComponentType<EntityComponentProps<E>>
}

const ChildListInner = observer(<E extends Entity>({ entityList, emptyText, onRemove, ListItemComponent }: ChildListInnerProps<E>) => (
    entityList.entities.length === 0 ?
        <Text>{emptyText}</Text> :
        entityList.entities.map((entity, index) => (
            <ChildListItem
                key={entity.id}
                index={index}
                id={entity.id}
                itemName={entity.itemName}
                onRemove={onRemove}
            >
                <ListItemComponent
                    data={entity}
                />
            </ChildListItem>
        ))
))

interface ChildListProps<E extends Entity> extends EntityListProps<E> {
    ListItemComponent: ComponentType<EntityComponentProps<E>>
}

const ChildList = observer(<E extends Entity>({ entityList, entityFactory, title, emptyText, addButtonText, ListItemComponent }: ChildListProps<E>) => {
    const handleAdd = () => entityList.add(entityFactory())
    const handleSwap = (destinationIndex: number, sourceIndex: number) => { entityList.swap(destinationIndex, sourceIndex) }
    const handleRemove = (id: string) => entityList.remove(id)

    return (
        <Fieldset legend={title}>
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
                            gap="md"
                            mb="md"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <ChildListInner
                                entityList={entityList}
                                emptyText={emptyText}
                                onRemove={handleRemove}
                                ListItemComponent={ListItemComponent}
                            />
                            {provided.placeholder}
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
})

export default ChildList