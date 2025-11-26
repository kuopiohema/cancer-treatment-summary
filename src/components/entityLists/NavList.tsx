import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { ActionIcon, Divider, Group, Stack, Text, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import { use } from 'react'
import { DataContext } from '../../data/DataContext.ts'
import { NavContext } from '../../nav/NavContext.ts'
import { Entity } from '../../store/entities/entity'
import { EntityList } from '../../store/entityList'
import { buildTextList } from '../../utils/buildTextList.tsx'
import { EntityListProps } from './entityListProps'
import NavListItem from './NavListItem'

interface NavListInnerProps<E extends Entity> {
    entityList: EntityList<E>
    emptyText: string
    itemName: string
    onRemove: (id: string) => void
}

const NavListInner = observer(<E extends Entity>({
                                                     entityList,
                                                     emptyText,
                                                     itemName,
                                                     onRemove
                                                 }: NavListInnerProps<E>) => {
    const data = use(DataContext)
    if (!data)
        throw new Error('Data context missing!')

    const nav = use(NavContext)
    if (!nav)
        throw new Error('Navigation context missing!')

    return entityList.entities.length === 0 ?
        <Text px="sm" pb="xs">{emptyText}</Text> :
        entityList.entities.map((entity, index) => {
            const { heading, content } = entity.label

            return <NavListItem
                key={entity.id}
                index={index}
                id={entity.id}
                itemName={itemName}
                label={heading}
                sublabel={buildTextList(content)}
                isSelected={nav.currentEntity === entity}
                onSelect={() => nav.selectEntity(entity)}
                onRemove={onRemove}
            />
        })
})

const NavList = <E extends Entity>({ entityList, entityFactory, title, emptyText, itemName }: EntityListProps<E>) => {
    const handleAdd = () => entityList.add(entityFactory())
    const handleSwap = (destinationIndex: number, sourceIndex: number) => {
        entityList.swap(destinationIndex, sourceIndex)
    }
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
                <Tooltip label={`Lisää ${itemName}`}>
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
                                itemName={itemName}
                                onRemove={handleRemove}
                            />
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default NavList