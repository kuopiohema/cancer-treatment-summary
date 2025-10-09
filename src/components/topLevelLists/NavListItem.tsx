import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Center, NavLink, Tooltip } from "@mantine/core";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import { MouseEventHandler, ReactNode } from "react";
import { RemoveCallback } from "../../hooks/useEntityStore";
import { removeConfirmModal } from "../../modals/removeConfirmModal";

interface NavListItemProps {
    index: number
    id: string
    itemName: string
    label: ReactNode
    sublabel: ReactNode
    isSelected: boolean
    onSelect: () => void
    onRemove: RemoveCallback
}

const NavListItem = ({ index, id, itemName, label, sublabel, isSelected, onSelect, onRemove }: NavListItemProps) => {
    const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
        removeConfirmModal(itemName, () => onRemove(id))
        e.stopPropagation()
    }

    return (
        <Draggable
            index={index}
            draggableId={id}
        >
            {(provided) => (
                <NavLink
                    label={label}
                    description={sublabel}
                    active={isSelected}
                    onClick={onSelect}
                    rightSection={
                        <Tooltip
                            label={`Poista ${itemName}`}
                        >
                            <ActionIcon
                                variant="subtle"
                                color="red"
                                onClick={handleRemove}
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

export default NavListItem