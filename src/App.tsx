import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
    Container,
    Group,
    ScrollArea,
    Text,
    useComputedColorScheme,
    useMantineColorScheme
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDeviceFloppy, IconFile, IconFileWord, IconFolderOpen, IconMoon, IconSun } from '@tabler/icons-react'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react'
import { use } from 'react'
import Navbar from './components/Navbar.tsx'
import PageDisplay from './components/PageDisplay.tsx'
import { StoreContext } from './store/StoreContext.ts'

const App = observer(() => {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navbarCollapsed, { toggle: toggleNavbarCollapsed }] = useDisclosure(true)

    const store = use(StoreContext)

    const handleReset = () => {
        store.clear()
    }

    const handleSave = () => {
        console.log(getSnapshot(store.form))
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
                    <ActionIcon variant="subtle" onClick={toggleColorScheme}>
                        {computedColorScheme === 'dark' ? <IconSun /> : <IconMoon />}
                    </ActionIcon>
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