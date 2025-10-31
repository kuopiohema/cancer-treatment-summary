import { modals } from "@mantine/modals"
import { Text } from "@mantine/core"
import { firstLetterUppercase } from "../utils/firstLetterUppercase"
import { notifications } from "@mantine/notifications"

const confirmMessage = (itemName: string, onConfirm: () => void) => {
    notifications.show({message: `${firstLetterUppercase(itemName)} poistettu!`})
    onConfirm()
}

export const removeConfirmModal = (itemName: string, onConfirm: () => void) => modals.openConfirmModal({
    title: `Poista ${itemName}`,
    children: (
        <Text size="sm">
            Poistetaanko {itemName}? Tietoja ei voi palauttaa!
        </Text>
    ),
    labels: {confirm: 'Poista', cancel: 'Peruuta'},
    confirmProps: {color: 'red'},
    onConfirm: () => confirmMessage(itemName, onConfirm)
})