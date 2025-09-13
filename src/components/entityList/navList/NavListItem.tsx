import { ReactNode, use } from "react";
import { EntityListItemProps } from "../entityListItemProps";
import { NavContext, Page } from "../../../context/navContext";
import { useRemoveConfirmModal } from "../../../hooks/useRemoveConfirmModal";
import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Center, NavLink, Tooltip } from "@mantine/core";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";

interface NavListItemProps extends EntityListItemProps {
    label: ReactNode
    sublabel?: ReactNode
    itemName: Page
}

const NavListItem = ({index, id, label, sublabel, itemName, onRemove}: NavListItemProps) => {
    const nav = use(NavContext) 
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
                    active={nav?.currentPath.page === itemName && nav?.currentPath.entityId === id}
                    onClick={() => nav?.setCurrentPath(itemName, id)}
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