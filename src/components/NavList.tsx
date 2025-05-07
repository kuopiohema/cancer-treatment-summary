import { ActionIcon, Center, Divider, Group, NavLink, Stack, Text, Tooltip } from "@mantine/core";
import { ItemListProps } from "./ItemList";
import { ArrayItem, useFormContext } from "../formContext";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { modals } from "@mantine/modals";
import { MouseEventHandler } from "react";

interface NavListProps extends Omit<ItemListProps, 'addButtonText'> {
    path: string
    itemFactory: () => unknown
    title: string
    addButtonTooltip: string
}

interface NavListItemBaseProps {
    index: number
    listPath: string
    itemPath: string
    selectedItem: string
    onSelectItem: (item: string) => void
    label: string
    removeButtonTooltip: string
}

export interface NavListItemProps<T extends ArrayItem> extends Omit<NavListItemBaseProps, 'listPath' | 'itemPath' | 'label' | 'removeButtonTooltip'> {
    item: T
}

function Item({ index, listPath, itemPath, selectedItem, onSelectItem, label, removeButtonTooltip }: NavListItemBaseProps) {
    const form = useFormContext()
    const fullPath = `${listPath}-${itemPath}`

    const confirmModal = () => modals.openConfirmModal({
        title: 'Poista kohde',
        children: (
            <Text size="sm">
                Poistetaanko kohde? Palauttaminen ei ole mahdollista!
            </Text>
        ),
        labels: { confirm: 'Poista', cancel: 'Peruuta' },
        onConfirm: () => form.removeListItem(listPath, index)
    })

    const handleClick: MouseEventHandler = (e) => {
        confirmModal()
        e.stopPropagation()
    }

    return (
        <Draggable
            index={index}
            draggableId={itemPath}
        >
            {(provided) => (
                <NavLink
                    href="#"
                    label={label}
                    active={selectedItem === fullPath}
                    onClick={() => onSelectItem(fullPath)}
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

NavList.Item = Item
export default NavList