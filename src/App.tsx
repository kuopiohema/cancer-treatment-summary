import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
    Container,
    Group,
    ScrollArea,
    Text,
    Tooltip,
    useComputedColorScheme,
    useMantineColorScheme
} from '@mantine/core'
import { useDisclosure, useFileDialog } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconDeviceFloppy, IconFile, IconFolderOpen, IconMoon, IconQuestionMark, IconSun } from '@tabler/icons-react'
import { fromSnapshot, getSnapshot, type SnapshotInOf } from 'mobx-keystone'
import { observer } from 'mobx-react'
import { use } from 'react'
import Navbar from './components/Navbar.tsx'
import PageDisplay from './components/PageDisplay.tsx'
import CreateWordButton from './CreateWordButton.tsx'
import type { FormStore } from './store/formStore.ts'
import { StoreContext } from './store/StoreContext.ts'
import { exportFile } from './utils/exportFile.ts'
import { showNotification } from './utils/showNotification.tsx'

const App = observer(() => {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navbarCollapsed, { toggle: toggleNavbarCollapsed }] = useDisclosure(true)

    const store = use(StoreContext)

    const handleResetConfirmed = () => {
        store.clear()
        showNotification('', 'Kaikki tiedot tyhjennetty!')
    }

    const handleReset = () => modals.openConfirmModal({
        title: 'Aloita uusi yhteenveto',
        children: (
            <Text size="sm">
                Aloitetaanko uusi yhteenveto? Kaikki tiedot tyhjennetään, eikä niitä voi palauttaa!
            </Text>
        ),
        labels: { confirm: 'Tyhjennä kaikki', cancel: 'Peruuta' },
        confirmProps: { color: 'red' },
        onConfirm: handleResetConfirmed
    })

    const handleSave = () => {
        const data = JSON.stringify(getSnapshot(store.form), null, 2)
        const status = exportFile('yhteenveto.json', data, 'application/json;charset=utf-8')
        if (status instanceof Error) {
            showNotification(
                'Tallenna tiedot',
                `Tietojen tallennuksessa tapahtui virhe: ${status.message}`,
                false
            )
        } else {
            showNotification(
                'Tallenna tiedot',
                'Lataa tiedosto koneellesi tallentaaksesi sovellukseen syötetyt tiedot!',
                true
            )
        }
    }

    const showLoadFailMessage = (message?: string) => showNotification(
        'Lataa tiedot',
        `Tiedoston lataaminen epäonnistui: ${message ?? 'Tuntematon virhe'}`,
        false
    )

    const handleLoad = (files: FileList | null) => {
        if (!files)
            return

        if (files.length > 1)
            return

        const file = files[0]

        const reader = new FileReader()
        reader.onerror = () => showLoadFailMessage(reader.error?.message)
        reader.onload = () => {
            if (typeof reader.result !== 'string') {
                showLoadFailMessage('Tiedoston sisältöä ei tunnistettu')
                return
            }

            try {
                const snapshot = JSON.parse(reader.result) as SnapshotInOf<FormStore>
                store.load(fromSnapshot<FormStore>(snapshot))
                showNotification(
                    'Lataa tiedot',
                    'Tietojen lataaminen onnistui!',
                    true
                )
            } catch {
                showLoadFailMessage('Tiedoston sisältöä ei tunnistettu')
            }
        }
        reader.readAsText(file)
    }

    const fileDialog = useFileDialog({
        multiple: false,
        accept: '.json',
        resetOnOpen: true,
        onChange: handleLoad
    })

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 400,
                breakpoint: 'sm',
                collapsed: {
                    desktop: false,
                    mobile: navbarCollapsed
                }
            }}
            footer={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header color="black">
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={!navbarCollapsed} onClick={toggleNavbarCollapsed} hiddenFrom="sm" size="sm" />
                        <Text size="xl">Syöpähoitojen yhteenveto</Text>
                    </Group>
                    <Group>
                        <Button
                            variant="default"
                            leftSection={<IconFile size={20} />}
                            onClick={handleReset}
                        >
                            Uusi
                        </Button>
                        <Button
                            variant="default"
                            leftSection={<IconFolderOpen size={20} />}
                            onClick={fileDialog.open}
                        >
                            Lataa
                        </Button>
                        <Button
                            variant="default"
                            leftSection={<IconDeviceFloppy size={20} />}
                            onClick={handleSave}
                        >
                            Tallenna
                        </Button>
                        <CreateWordButton />
                    </Group>
                    <Group>
                        <Tooltip label="Käyttöohjeet">
                            <ActionIcon variant="subtle" onClick={() => store.nav.selectPage('help')}>
                                <IconQuestionMark />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={`Vaihda ${computedColorScheme === 'dark' ? 'vaaleaan' : 'tummaan'} tilaan`}>
                            <ActionIcon variant="subtle" onClick={toggleColorScheme}>
                                {computedColorScheme === 'dark' ? <IconSun /> : <IconMoon />}
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <AppShell.Section component={ScrollArea}>
                    <Navbar />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Container ml={0} size="md">
                    <PageDisplay />
                </Container>
            </AppShell.Main>
            <AppShell.Footer></AppShell.Footer>
        </AppShell>
    )
})

export default App