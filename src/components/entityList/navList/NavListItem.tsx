import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Center, Group, NavLink, ThemeIcon, Tooltip } from "@mantine/core";
import { IconGripVertical, IconInfoCircle, IconTrash } from "@tabler/icons-react";
import { ReactNode, use } from "react";
import { NavContext, Path } from "../../../context/navContext";
import { useRemoveConfirmModal } from "../../../hooks/useRemoveConfirmModal";
import { EntityListItemProps } from "../entityListItemProps";

interface NavListItemProps extends EntityListItemProps {
    label: ReactNode
    sublabel?: ReactNode
    info?: ReactNode
    itemName: Path
}

const NavListItem = ({ index, id, label, sublabel, info, itemName, onRemove }: NavListItemProps) => {
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
                    active={nav?.currentPath.path === itemName && nav?.currentPath.entityId === id}
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
                        <Group>
                            <Center {...provided.dragHandleProps}>
                                <IconGripVertical size={18} />
                            </Center>
                            {info && <Tooltip
                                label={info}
                            >
                                <ThemeIcon
                                    variant="subtle"
                                    color="yellow"
                                >
                                    <IconInfoCircle />
                                </ThemeIcon>
                            </Tooltip>}
                        </Group>
                    }
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                />
            )}
        </Draggable>
    )
}

export default NavListItem