import { Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconFileWord } from '@tabler/icons-react'
import { getSnapshot } from 'mobx-keystone'
import { type ChangeEvent, use, useState } from 'react'
import { StoreContext } from './store/StoreContext.ts'
import { generateDoc } from './utils/generateDoc.ts'
import { showNotification } from './utils/showNotification.tsx'

const CreateWordButton = () => {
    const [modalOpened, modalHandlers] = useDisclosure(false)

    const [name, setName] = useState('')
    const [id, setId] = useState('')

    const store = use(StoreContext)

    const handleClose = () => {
        setName('')
        setId('')
        modalHandlers.close()
    }

    const handleAbort = () => {
        handleClose()
    }

    const handleConfirm = () => {
        generateDoc(getSnapshot(store.form), { name, id })
            .then(() => showNotification(
                'Luo Word-tiedosto',
                <p>Tiedoston luonti onnistunut!<br />Avaa tiedosto muokkausta ja tulostusta varten.<br />Poista tiedosto
                    tämän jälkeen koneeltasi!</p>,
                true
            ))
            .catch((error) =>
                showNotification(
                    'Luo Word-tiedosto',
                    `Word-tiedoston luonti epäonnistunut: ${typeof error === 'string' ? error : error instanceof Error ? error.message : 'Tuntematon virhe'}`,
                    false
                ))
        handleClose()
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return <>
        <Button
            variant="default"
            leftSection={<IconFileWord size={20} />}
            onClick={modalHandlers.open}
        >
            Luo Word-tiedosto
        </Button>
        <Modal
            opened={modalOpened}
            onClose={handleClose}
            title="Luo Word-tiedosto"
        >
            <Stack gap="md">
                <Text size="sm">Tähän syötetyt tiedot tallennetaan vain luotuun Word-tiedostoon, ei itse
                    lomakkeeseen!</Text>
                <TextInput
                    value={name}
                    onChange={handleNameChange}
                    label="Nimi"
                    placeholder="Potilaan nimi"
                    data-autofocus
                />
                <TextInput
                    value={id}
                    onChange={e => setId(e.target.value)}
                    label="Henkilötunnus"
                    placeholder="Potilaan henkilötunnus"
                />
                <Group justify="end">
                    <Button
                        color="red"
                        onClick={handleAbort}
                    >
                        Peruuta
                    </Button>
                    <Button
                        color="green"
                        onClick={handleConfirm}
                    >
                        Hyväksy
                    </Button>
                </Group>
            </Stack>
        </Modal>
    </>
}

export default CreateWordButton