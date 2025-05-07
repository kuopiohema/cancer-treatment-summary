import {Draggable} from '@hello-pangea/dnd'
import {ActionIcon, alpha, Card, Center, Stack, Text} from '@mantine/core'
import {modals} from '@mantine/modals'
import {IconGripHorizontal, IconTrash} from '@tabler/icons-react'
import {PropsWithChildren} from 'react'
import {useFormContext} from '../formContext.ts'

export interface ItemCardProps extends PropsWithChildren {
    path: string
    index: number
    draggableId: string
}

export default function ItemCard({path, index, draggableId, children}: ItemCardProps) {
    const form = useFormContext()

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
                    <Stack gap="xs">
                        {children}
                    </Stack>
                </Card>
            )}
        </Draggable>
    )
}