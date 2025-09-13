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
import { use } from 'react'
import NavList from './components/entityList/navList/NavList.tsx'
import DiagnosisNavListItem from './components/entityList/navList/items/DiagnosisNavListItem.tsx'
import { NavContext } from './context/navContext.tsx'
import { StoreContext } from './context/storeContext.tsx'
import { StoreActionsContext } from './context/storeActionsContext.tsx'

const App = () => {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navbarCollapsed, { toggle: toggleNavbarCollapsed }] = useDisclosure(true)

    const store = use(StoreContext)!
    const storeActions = use(StoreActionsContext)!
    const nav = use(NavContext)!

    const handleReset = () => {
        storeActions.clear()
    }

    const handleSave = () => {
        console.log(JSON.stringify(store))
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
                        <Button variant="default" leftSection={<IconFileWord size={20} />}>Luo
                            Word-tiedosto</Button>
                    </Group>
                    <ActionIcon variant="subtle" onClick={toggleColorScheme}>
                        {computedColorScheme === 'dark' ? <IconSun /> : <IconMoon />}
                    </ActionIcon>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <AppShell.Section component={ScrollArea}>
                    <NavLink
                        href="#"
                        label="Aloitus"
                        active={nav.currentPath.page === 'start'}
                        onClick={() => nav.setCurrentPath('start')}
                    />
                    <NavList
                        list={store.diagnoses}
                        ItemComponent={DiagnosisNavListItem}
                        title="Diagnoosit"
                        emptyText="Ei diagnooseja"
                        addButtonText="Lisää diagnoosi"
                    />
                    {/*
                        <NavList
                            items={formValues.treatments}
                            path="treatments"
                            itemFactory={newTreatment}
                            ItemComponent={TreatmentNavListItem}
                            title="Hoidot"
                            emptyText="Ei hoitoja"
                            addButtonText="Lisää hoito"
                        />
                        <NavList
                            items={formValues.chemotherapies}
                            path="chemotherapies"
                            itemFactory={newChemotherapy}
                            ItemComponent={ChemotherapyNavListItem}
                            title="Kemoterapiajaksot"
                            emptyText="Ei kemoterapiajaksoja"
                            addButtonText="Lisää kemoterapiajakso"
                        />
                        <NavList
                            items={formValues.radiotherapies}
                            path="radiotherapies"
                            itemFactory={newRadiotherapy}
                            ItemComponent={RadiotherapyNavListItem}
                            title="Sädehoidot"
                            emptyText="Ei sädehoitoja"
                            addButtonText="Lisää sädehoito"
                        />
                        <NavList
                            items={formValues.procedures}
                            path="procedures"
                            itemFactory={newProcedure}
                            ItemComponent={ProcedureNavListItem}
                            title="Leikkaukset ja toimenpiteet"
                            emptyText="Ei toimenpiteitä"
                            addButtonText="Lisää toimenpide"
                        />
                        <NavList
                            items={formValues.stemCellTransplants}
                            path="stemCellTransplants"
                            itemFactory={newStemCellTransplant}
                            ItemComponent={StemCellTransplantNavListItem}
                            title="Kantasolusiirrot"
                            emptyText="Ei kantasolusiirtoja"
                            addButtonText="Lisää kantasolusiirto"
                        />*/}
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Container ml={0} size="md">
                    {nav.currentPage}
                </Container>
            </AppShell.Main>
        </AppShell>
    )
}

export default App