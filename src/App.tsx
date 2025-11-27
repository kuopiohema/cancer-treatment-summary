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
import { getSnapshot } from 'mobx-keystone'
import { use } from 'react'
import Navbar from './components/Navbar.tsx'
import PageDisplay from './components/PageDisplay.tsx'
import CreateWordButton from './CreateWordButton.tsx'
import { NavContext } from './nav/NavContext.ts'
import { StoreContext } from './store/StoreContext.ts'
import { exportFile } from './utils/exportFile.ts'
import { showNotification } from './utils/showNotification.tsx'

const App = (() => {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navbarCollapsed, { toggle: toggleNavbarCollapsed }] = useDisclosure(true)

    const store = use(StoreContext)
    if (!store)
        throw new Error('Store context missing!')

    const nav = use(NavContext)
    if (!nav)
        throw new Error('Navigation context missing!')

    const reset = () => {
        store.clear()
        nav.reset()
    }

    const handleResetConfirmed = () => {
        reset()
        showNotification('Kaikki tiedot tyhjennetty!', 'Voit nyt aloittaa uuden yhteenvedon tekemistä.')
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

    const handleLoadConfirmed = (files: FileList | null) => {
        if (files?.length !== 1)
            return

        reset()
        void store.load(files[0])
    }
    
    const fileDialog = useFileDialog({
        multiple: false,
        accept: '.json',
        resetOnOpen: true,
        onChange: handleLoadConfirmed
    })

    const handleLoad = () => modals.openConfirmModal({
        title: 'Avaa yhteenveto',
        children: (
            <Text size="sm">
                Avataanko yhteenveto? Sovellukseen syötetyt tiedot tyhjennetään, eikä niitä voi palauttaa!
            </Text>
        ),
        labels: { confirm: 'Avaa yhteenveto', cancel: 'Peruuta' },
        confirmProps: { color: 'green' },
        onConfirm: fileDialog.open
    })

    const handleSave = () => {
        const data = JSON.stringify(getSnapshot(store), null, 2)
        const status = exportFile('yhteenveto.json', data, 'application/json;charset=utf-8')
        if (status instanceof Error) {
            showNotification(
                'Tietojen tallennuksessa tapahtui virhe:',
                status.message,
                false
            )
        } else {
            showNotification(
                'Tietojen tallentaminen onnistui!',
                'Lataa tiedosto koneellesi tallentaaksesi sovellukseen syötetyt tiedot!',
                true
            )
        }
    }

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
                            onClick={handleLoad}
                        >
                            Avaa
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
                            <ActionIcon variant="subtle" onClick={() => nav.selectPage('help')}>
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