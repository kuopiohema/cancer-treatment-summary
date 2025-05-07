import {MouseEventHandler, use} from 'react'
import {NavContext} from '../navContext.tsx'
import {ArrayItem, useFormContext} from '../formContext.ts'
import {Draggable} from '@hello-pangea/dnd'
import {IconGripVertical, IconTrash} from '@tabler/icons-react'
import {ActionIcon, Center, NavLink, Text, Tooltip} from '@mantine/core'
import {modals} from '@mantine/modals'

interface NavListItemProps {
    index: number
    path: string
    id: string
    label: string
    removeButtonTooltip: string
}

export interface TypedNavListItemProps<T extends ArrayItem> {
    index: number
    item: T
}

export default function NavListItem({index, path, id, label, removeButtonTooltip}: NavListItemProps) {
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