import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { firstLetterUppercase } from '../utils/firstLetterUppercase'
import { showNotification } from '../utils/showNotification.tsx'

const confirmMessage = (itemName: string, onConfirm: () => void) => {
    showNotification('', `${firstLetterUppercase(itemName)} poistettu!`)
    onConfirm()
}

export const removeConfirmModal = (itemName: string, onConfirm: () => void) => modals.openConfirmModal({
    title: `Poista ${itemName}`,
    children: (
        <Text size="sm">
            Poistetaanko {itemName}? Tietoja ei voi palauttaa!
        </Text>
    ),
    labels: { confirm: 'Poista', cancel: 'Peruuta' },
    confirmProps: { color: 'red' },
    onConfirm: () => confirmMessage(itemName, onConfirm)
})