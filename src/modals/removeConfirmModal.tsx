import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"

export const removeConfirmModal = (itemName: string, onConfirm: () => void) => modals.openConfirmModal({
    title: `Poista ${itemName}`,
    children: (
        <Text size="sm">
            Poistetaanko {itemName}? Tietoja ei voi palauttaa!
        </Text>
    ),
    labels: {confirm: 'Poista', cancel: 'Peruuta'},
    confirmProps: {color: 'red'},
    onConfirm: onConfirm
})