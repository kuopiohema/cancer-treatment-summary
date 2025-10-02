import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Center, NavLink, Tooltip } from "@mantine/core";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import { ReactNode, use } from "react";
import { RemoveCallback } from "../../hooks/useEntityStore";
import { useRemoveConfirmModal } from "../../hooks/useRemoveConfirmModal";
import { NavContext, Path } from "../../context/navContext";

interface NavListItemProps {
    index: number
    id: string
    onRemove: RemoveCallback
    label: ReactNode
    sublabel?: ReactNode
    itemName: string
    path: Path
}

const NavListItem = ({ index, id, label, sublabel, itemName, path, onRemove }: NavListItemProps) => {
    const nav = use(NavContext)
    if (!nav)
        throw new Error('Nav context missing!')

    const handleRemove = useRemoveConfirmModal(itemName, () => onRemove(id))

    return (
        <Draggable
            index={index}
            draggableId={id}
        >
            {(provided) => (
                <NavLink
                    href="#"
                    label={label}
                    description={sublabel}
                    active={nav.path === path && nav.entityId === id}
                    onClick={() => nav.setLocation(path, id)}
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