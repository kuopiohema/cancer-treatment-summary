import { ReactNode, use } from "react";
import { EntityListItemProps } from "../entityListItemProps";
import { NavContext } from "../../../context/navContext";
import { useRemoveConfirmModal } from "../../../hooks/useRemoveConfirmModal";
import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Center, NavLink, Tooltip } from "@mantine/core";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import getPageKey from "../../../utils/getPageKey";

interface NavListItemProps extends EntityListItemProps {
    label: ReactNode
    sublabel?: ReactNode
    itemName: string
}

export default function NavListItem({index, id, label, sublabel, itemName, onRemove}: NavListItemProps) {
    const nav = use(NavContext)
    const key = getPageKey(itemName, id)    
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
                    active={nav?.currentPage === key}
                    onClick={() => nav?.setCurrentPage(key)}
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