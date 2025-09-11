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
import { use, useMemo, useState, type ComponentType } from 'react'
import { NavContext } from './context/navContext.tsx'
import { newDiagnosis } from './types/form/diagnosis.ts'
import type { Entity } from './types/form/entity.ts'
import Start from './pages/Start'
import getPageKey from './utils/getPageKey.ts'
import { StoreActionsContext, StoreContext } from './context/storeContext.tsx'
import NavList from './components/entityList/navList/NavList.tsx'
import DiagnosisNavListItem from './components/entityList/navList/items/DiagnosisNavListItem.tsx'

export default function App() {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navCollapsed, { toggle: toggleNavCollapsed }] = useDisclosure(true)
    const [currentPage, setCurrentPage] = useState('start')
    const navContextValue = useMemo(() => ({ currentPage, setCurrentPage }), [currentPage, setCurrentPage])

    const store = use(StoreContext)!
    const storeActions = use(StoreActionsContext)!

    const handleReset = () => {}

    const handleSave = () => {
        console.log(JSON.stringify(store))
    }

    const handleLoad = () => {
        console.log('Load')
    }

    const getDisplayedPage = <T extends Entity>(array: T[], path: string, ItemComponent: ComponentType<ItemProps<T>>) =>
        array.map((item, index) =>
            currentPage === getPageKey(path, item.id) &&
            <ItemComponent key={item.id} path={path} index={index} item={item} />
        )

    return (
        <NavContext value={navContextValue}>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 400,
                    breakpoint: 'sm',
                    collapsed: {
                        desktop: false,
                        mobile: navCollapsed
                    }
                }}
                padding="md"
            >
                <AppShell.Header color="black">
                    <Group h="100%" px="md" justify="space-between">
                        <Group>
                            <Burger opened={!navCollapsed} onClick={toggleNavCollapsed} hiddenFrom="sm" size="sm" />
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
                            active={currentPage === 'start'}
                            onClick={() => setCurrentPage('start')}
                        />
                        <NavList
                            items={store.diagnoses}
                            ItemComponent={DiagnosisNavListItem}
                            onAdd={() => storeActions.add('diagnoses', newDiagnosis)}
                            onSwap={(firstIndex: number, secondIndex: number) => storeActions.swap('diagnoses', firstIndex, secondIndex)}
                            onRemove={(id: string) => storeActions.remove('diagnoses', id)}
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
                        {currentPage === 'start' && <Start />}
                        {/*
                        {getDisplayedPage(formValues.diagnoses, 'diagnoses', DiagnosisItem)}
                        {getDisplayedPage(formValues.treatments, 'treatments', TreatmentItem)}
                        {getDisplayedPage(formValues.chemotherapies, 'chemotherapies', ChemoItem)}
                        {getDisplayedPage(formValues.radiotherapies, 'radiotherapies', RadiotherapyItem)}
                        {getDisplayedPage(formValues.procedures, 'procedures', ProcedureItem)}
                        {getDisplayedPage(formValues.stemCellTransplants, 'stemCellTransplants', StemCellTransplantItem)}*/}
                    </Container>
                </AppShell.Main>
            </AppShell>
        </NavContext>
    )
}
