import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ActionIcon, Center, Divider, Group, NavLink, Stack, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import { MouseEventHandler, use } from "react";
import { ArrayItem, useFormContext } from "../formContext";
import { NavContext } from "../navContext";
import { ItemListProps } from "./ItemList";

interface NavListProps extends Omit<ItemListProps, 'addButtonText'> {
    addButtonTooltip: string
}

function NavList({ path, itemFactory, title, addButtonTooltip, children }: NavListProps) {
    const form = useFormContext()

    return (
        <>
            <Divider my="xs" />
            <Group
                px="sm"
                pb="xs"
                justify="space-between"
            >
                <Text fw="bold">{title}</Text>
                <Tooltip label={addButtonTooltip}>
                    <ActionIcon
                        variant="subtle"
                        onClick={() => form.insertListItem(path, itemFactory())}
                    >
                        <IconPlus />
                    </ActionIcon>
                </Tooltip>
            </Group>
            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    destination?.index !== undefined &&
                    form.reorderListItem(path, { from: source.index, to: destination.index })
                }
            >
                <Droppable
                    droppableId={path}
                    direction="vertical"
                >
                    {(provided) => (
                        <Stack
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            gap={0}
                        >
                            {children}
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

interface NavListItemProps {
    index: number
    path: string
    id: string
    label: string
    removeButtonTooltip: string
}

export interface DefinedNavListItemProps<T extends ArrayItem> {
    index: number
    item: T
}

function Item({ index, path, id, label, removeButtonTooltip }: NavListItemProps) {
    const {currentPage, setCurrentPage} = use(NavContext)!

    const form = useFormContext()
    const key = `${path}-${id}`

    const confirmModal = () => modals.openConfirmModal({
        title: 'Poista kohde',
        children: (
            <Text size="sm">
                Poistetaanko kohde? Palauttaminen ei ole mahdollista!
            </Text>
        ),
        labels: { confirm: 'Poista', cancel: 'Peruuta' },
        onConfirm: () => form.removeListItem(path, index)
    })

    const handleClick: MouseEventHandler = (e) => {
        confirmModal()
        e.stopPropagation()
    }

    return (
        <Draggable
            index={index}
            draggableId={id}
        >
            {(provided) => (
                <NavLink
                    href="#"
                    label={label}
                    active={currentPage === key}
                    onClick={() => setCurrentPage(key)}
                    rightSection={
                        <Tooltip
                            label={removeButtonTooltip}
                        >
                            <ActionIcon
                                variant="subtle"
                                color="red"
                                onClick={handleClick}
                            >
                                <IconTrash />
                            </ActionIcon>
                        </Tooltip>
                    }
                    leftSection={
                        <Center {...provided.dragHandleProps}>
                            <IconGripVertical size={18} />
                        </Center>
                    }
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                />
            )}
        </Draggable>
    )
}

NavList.Item = Item
export default NavList