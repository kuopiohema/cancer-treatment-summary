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
import { use, useMemo, useState } from 'react'
import Start from './components/pages/Start.tsx'
import { NavContext } from './context/navContext.ts'
import { getSnapshot } from 'mobx-keystone'
import DiagnosisNavListItem from './components/navList/items/DiagnosisNavListItem.tsx'
import NavList from './components/navList/NavList.tsx'
import { observer } from 'mobx-react'
import { createRootStore } from './store/store.ts'

const App = observer(() => {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navbarCollapsed, { toggle: toggleNavbarCollapsed }] = useDisclosure(true)

    const nav = use(NavContext)
    if (!nav)
        throw new Error('Nav context missing!')

    const [store] = useState(() => createRootStore())


    const handleReset = () => {
        //storeActions.clear()
    }

    const handleSave = () => {
        console.log(getSnapshot(store))
    }

    const handleLoad = () => {
        console.log('Load')
    }

    const currentPage = useMemo(() => {
        switch (nav.path) {
            case 'start':
                return <Start />
            /*case 'diagnoses':
                return diagnosesList.map(atom => {
                    const key = `${atom.toString()}`
                    console.log(key)
                    return key === navLocation.entityId &&
                        <ItemPage
                            key={`${atom.toString()}`}
                            entityAtom={atom}
                            InnerComponent={DiagnosisPage}
                        />
                })
            /*case 'treatments':
                return <ItemPage
                    id={navLocation.entityId}
                    entityStore={store.treatments}
                    InnerComponent={TreatmentPage}
                />
            case 'chemotherapies':
                return <ItemPage
                    id={navLocation.entityId}
                    entityStore={store.chemotherapies}
                    InnerComponent={ChemotherapyPage}
                    fullWidth
                />*/
        }
    }, [nav.path])

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
                        active={nav.path === 'start'}
                        onClick={() => nav.setLocation('start', '')}
                    />
                    <NavList
                        entityList={store.diagnoses}
                        ItemComponent={DiagnosisNavListItem}
                        title="Diagnoosit"
                        emptyText="Ei diagnooseja"
                        addButtonText="Lisää diagnoosi"
                    />
                    {/*<NavList
                        entityStore={store.treatments}
                        ItemComponent={TreatmentNavListItem}
                        title="Hoidot"
                        emptyText="Ei hoitoja"
                        addButtonText="Lisää hoito"
                    />
                    <NavList
                        entityStore={store.chemotherapies}
                        ItemComponent={ChemotherapyNavListItem}
                        title="Kemoterapiajaksot"
                        emptyText="Ei kemoterapiajaksoja"
                        addButtonText="Lisää kemoterapiajakso"
                    />
                    {/*
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
                    {currentPage}
                </Container>
            </AppShell.Main>
        </AppShell>
    )
})

export default App