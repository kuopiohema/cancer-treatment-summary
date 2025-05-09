import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { MouseEventHandler } from 'react'

export function useRemoveConfirmModal(itemName: string, onRemove: () => void) {
    const confirmModal = () => modals.openConfirmModal({
        title: `Poista ${itemName}`,
        children: (
            <Text size="sm">
                Poistetaanko {itemName}? Palauttaminen ei ole mahdollista!
            </Text>
        ),
        labels: {confirm: 'Poista', cancel: 'Peruuta'},
        onConfirm: onRemove
    })

    const handleClick: MouseEventHandler = (e) => {
        confirmModal()
        e.stopPropagation()
    }

    return handleClick
}