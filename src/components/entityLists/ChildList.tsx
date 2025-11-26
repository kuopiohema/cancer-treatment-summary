import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { Button, Fieldset, Stack, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import { ComponentType } from 'react'
import { Entity } from '../../store/entities/entity'
import { EntityList } from '../../store/entityList'
import { ListItemProps } from '../entities/listItems/listItemProps'
import ChildListItem from './ChildListItem'
import { EntityListProps } from './entityListProps'

interface ChildListInnerProps<E extends Entity> {
    entityList: EntityList<E>
    emptyText: string
    itemName: string
    onRemove: (id: string) => void
    ListItemComponent: ComponentType<ListItemProps<E>>
}

const ChildListInner = observer(<E extends Entity>({
                                                       entityList,
                                                       emptyText,
                                                       itemName,
                                                       onRemove,
                                                       ListItemComponent
                                                   }: ChildListInnerProps<E>) => (
    entityList.entities.length === 0 ?
        <Text>{emptyText}</Text> :
        entityList.entities.map((entity, index) => (
            <ChildListItem
                key={entity.id}
                index={index}
                id={entity.id}
                itemName={itemName}
                onRemove={onRemove}
            >
                <ListItemComponent
                    entity={entity}
                />
            </ChildListItem>
        ))
))

interface ChildListProps<E extends Entity> extends EntityListProps<E> {
    ListItemComponent: ComponentType<ListItemProps<E>>
}

const ChildList = <E extends Entity>({
                                         entityList,
                                         entityFactory,
                                         title,
                                         emptyText,
                                         itemName,
                                         ListItemComponent
                                     }: ChildListProps<E>) => {
    const handleAdd = () => entityList.add(entityFactory())
    const handleSwap = (destinationIndex: number, sourceIndex: number) => {
        entityList.swap(destinationIndex, sourceIndex)
    }
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
                                itemName={itemName}
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
                Lisää {itemName}
            </Button>
        </Fieldset>
    )
}

export default ChildList