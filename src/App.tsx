import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
    Container,
    Group,
    NavLink,
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
import NavList from './components/entityLists/NavList.tsx'
import PageDisplay from './components/PageDisplay.tsx'
import { CellTherapy } from './store/entity/cellTherapy.ts'
import { Chemotherapy } from './store/entity/chemotherapy.ts'
import { Diagnosis } from './store/entity/diagnosis.ts'
import { Procedure } from './store/entity/procedure.ts'
import { Radiotherapy } from './store/entity/radiotherapy.ts'
import { Treatment } from './store/entity/treatment.ts'
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
                    <NavLink
                        label="Aloitus"
                        active={store.nav.page === 'start'}
                        onClick={() => store.nav.selectPage('start')}
                    />
                    <NavList
                        entityList={store.form.diagnoses}
                        entityFactory={() => new Diagnosis({})}
                        title="Diagnoosit"
                        emptyText="Ei diagnooseja"
                        addButtonText="Lisää diagnoosi"
                    />
                    <NavList
                        entityList={store.form.treatments}
                        entityFactory={() => new Treatment({})}
                        title="Hoidot"
                        emptyText="Ei hoitoja"
                        addButtonText="Lisää hoito"
                    />
                    <NavList
                        entityList={store.form.chemotherapies}
                        entityFactory={() => new Chemotherapy({})}
                        title="Lääkehoitojaksot"
                        emptyText="Ei lääkehoitojaksoja"
                        addButtonText="Lisää lääkehoitojakso"
                    />
                    <NavList
                        entityList={store.form.radiotherapies}
                        entityFactory={() => new Radiotherapy({})}
                        title="Sädehoitojaksot"
                        emptyText="Ei sädehoitojaksoja"
                        addButtonText="Lisää sädehoitojakso"
                    />
                    <NavList
                        entityList={store.form.procedures}
                        entityFactory={() => new Procedure({})}
                        title="Leikkaukset ja toimenpiteet"
                        emptyText="Ei toimenpiteitä"
                        addButtonText="Lisää toimenpide"
                    />
                    <NavList
                        entityList={store.form.cellTherapies}
                        entityFactory={() => new CellTherapy({})}
                        title="Kantasolusiirrot ja muut soluhoidot"
                        emptyText="Ei soluhoitoja"
                        addButtonText="Lisää soluhoito"
                    />
                    <NavLink
                        label="Vierasesineet"
                        active={store.nav.page === 'foreignBodies'}
                        onClick={() => store.nav.selectPage('foreignBodies')}
                    />
                    <NavLink
                        label="Pitkäaikaishaitat"
                        active={store.nav.page === 'adverseEffects'}
                        onClick={() => store.nav.selectPage('adverseEffects')}
                    />
                    <NavLink
                        label="Jälkiseuranta"
                        active={store.nav.page === 'followup'}
                        onClick={() => store.nav.selectPage('followup')}
                    />
                    <NavLink
                        label="Lomakkeen täyttäjä"
                        active={store.nav.page === 'signature'}
                        onClick={() => store.nav.selectPage('signature')}
                    />
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