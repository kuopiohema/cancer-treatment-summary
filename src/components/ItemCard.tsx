import {ActionIcon, alpha, Card, Center, Text} from '@mantine/core'
import type {UseFormReturnType} from '@mantine/form'
import {PropsWithChildren} from 'react'
import {IconGripHorizontal, IconTrash} from '@tabler/icons-react'
import type {FormValues} from '../formContext.ts'
import { Draggable } from '@hello-pangea/dnd'
import { modals } from '@mantine/modals'

export interface ItemCardProps extends PropsWithChildren {
    form: UseFormReturnType<FormValues>
    formPath: string
    index: number
    draggableId: string
}

export default function ItemCard({form, formPath, index, draggableId, children}: ItemCardProps) {
    const confirmModal = () => modals.openConfirmModal({
        title: 'Poista kohde',
        children: (
            <Text size="sm">
                Poistetaanko kohde? Palauttaminen ei ole mahdollista!
            </Text>
        ),
        labels: { confirm: 'Poista', cancel: 'Peruuta' },
        onConfirm: () => form.removeListItem(formPath, index)
    })

    const cardBackgroundColor = alpha('var(--mantine-color-gray-6)', 0.2)

    return (
        <Draggable index={index} draggableId={draggableId}>
            {(provided) => (
                <Card
                    shadow="sm"
                    withBorder
                    p="md"
                    bg={cardBackgroundColor}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Card.Section mb="md">
                        <Center {...provided.dragHandleProps}>
                            <IconGripHorizontal size={18} />
                        </Center>
                        <ActionIcon
                            color="red"
                            variant="subtle"
                            pos="absolute"
                            top="0"
                            right="0"
                            onClick={confirmModal}
                        >
                            <IconTrash size={22} />
                        </ActionIcon>
                    </Card.Section>
                    {children}
                </Card>
            )}
        </Draggable>
    )
}