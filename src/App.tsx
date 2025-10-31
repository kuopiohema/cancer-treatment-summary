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
import { useDisclosure } from '@mantine/hooks'
import { IconDeviceFloppy, IconFile, IconFileWord, IconFolderOpen, IconMoon, IconQuestionMark, IconSun } from '@tabler/icons-react'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react'
import { use } from 'react'
import Navbar from './components/Navbar.tsx'
import PageDisplay from './components/PageDisplay.tsx'
import { StoreContext } from './store/StoreContext.ts'
import { modals } from '@mantine/modals'
import { exportJsonToFile } from './utils/exportFile.ts'

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
    }

    const handleReset = () => modals.openConfirmModal({
        title: 'Aloita uusi yhteenveto',
        children: (
            <Text size="sm">
                Aloitetaanko uusi yhteenveto? Kaikki tiedot tyhjennetään, eikä niitä voi palauttaa!
            </Text>
        ),
        labels: {confirm: 'Tyhjennä kaikki', cancel: 'Peruuta'},
        confirmProps: {color: 'red'},
        onConfirm: handleResetConfirmed
    })

    const handleSave = () => {
        const data = JSON.stringify(getSnapshot(store.form))
        const status = exportJsonToFile('yhteenveto.json', data)
        if (status instanceof Error) {
            
        }
    }

    const handleLoad = () => {
        console.log('Load')
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
                            Lataa
                        </Button>
                        <Button
                            variant="default"
                            leftSection={<IconDeviceFloppy size={20} />}
                            onClick={handleSave}
                        >
                            Tallenna
                        </Button>
                        <Button variant="default" leftSection={<IconFileWord size={20} />}>
                            Luo Word-tiedosto
                        </Button>
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