import { Draggable } from '@hello-pangea/dnd'
import { ActionIcon, Center, NavLink, Tooltip } from '@mantine/core'
import { IconGripVertical, IconTrash } from '@tabler/icons-react'
import { use } from 'react'
import { useFormContext } from '../form/formContext.ts'
import { useRemoveConfirmModal } from '../hooks/useRemoveConfirmModal.tsx'
import { NavContext } from '../navContext.tsx'
import getPageKey from '../utils/getPageKey.ts'

interface NavListItemProps {
    index: number
    path: string
    id: string
    label: string
    sublabel?: string
    itemName: string
}

export default function NavListItem({index, path, id, label, sublabel, itemName}: NavListItemProps) {
    const nav = use(NavContext)

    const form = useFormContext()
    const key = getPageKey(path, id)

    const handleRemove = useRemoveConfirmModal(itemName, () => form.removeListItem(path, index))

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