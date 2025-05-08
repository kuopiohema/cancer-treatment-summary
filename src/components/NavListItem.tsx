import {MouseEventHandler, use} from 'react'
import {NavContext} from '../navContext.tsx'
import {useFormContext} from '../formContext.ts'
import {Draggable} from '@hello-pangea/dnd'
import {IconGripVertical, IconTrash} from '@tabler/icons-react'
import {ActionIcon, Center, NavLink, Text, Tooltip} from '@mantine/core'
import {modals} from '@mantine/modals'
import getPageKey from '../utils/getPageKey.ts'

interface NavListItemProps {
    index: number
    path: string
    id: string
    label: string
    itemName: string
}

export default function NavListItem({index, path, id, label, itemName}: NavListItemProps) {
    const nav = use(NavContext)

    const form = useFormContext()
    const key = getPageKey(path, id)

    const confirmModal = () => modals.openConfirmModal({
        title: `Poista ${itemName}`,
        children: (
            <Text size="sm">
                Poistetaanko {itemName}? Palauttaminen ei ole mahdollista!
            </Text>
        ),
        labels: {confirm: 'Poista', cancel: 'Peruuta'},
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
                    active={nav?.currentPage === key}
                    onClick={() => nav?.setCurrentPage(key)}
                    rightSection={
                        <Tooltip
                            label={`Poista ${itemName}`}
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