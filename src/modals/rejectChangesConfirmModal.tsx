import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export const rejectChangesConfirmModal = (onConfirm: () => void) => modals.openConfirmModal({
    title: 'Perutaanko muutokset?',
    children: (
        <Text size="sm">
            Tallentamattomat muutokset menetetään! Jatketaanko?
        </Text>
    ),
    labels: { confirm: 'Jatka', cancel: 'Peruuta' },
    confirmProps: { color: 'red' },
    onConfirm: onConfirm
})