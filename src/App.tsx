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
import { useMemo, useState, type ComponentType } from 'react'
import DiagnosisNavListItem from './components/navList/items/DiagnosisNavListItem.tsx'
import TreatmentNavListItem from './components/navList/items/TreatmentNavListItem.tsx'
import NavList from './components/navList/NavList.tsx'
import { newDiagnosis } from './form/diagnosis.ts'
import { FormProvider, useForm } from './form/formContext.ts'
import type { ListItem } from './form/listItem.ts'
import { newTreatment } from './form/treatment.ts'
import { NavContext } from './navContext.tsx'
import DiagnosisItem from './components/itemList/items/DiagnosisItem.tsx'
import Start from './pages/Start'
import TreatmentItem from './components/itemList/items/TreatmentItem.tsx'
import type { ItemProps } from './types/itemProps.ts'
import getPageKey from './utils/getPageKey.ts'
import { newChemotherapy } from './form/chemotherapy.ts'
import ChemotherapyNavListItem from './components/navList/items/ChemotherapyNavListItem.tsx'
import ChemoItem from './components/itemList/items/ChemoItem.tsx'
import { newRadiotherapy } from './form/radiotherapy.ts'
import RadiotherapyNavListItem from './components/navList/items/RadiotherapyNavListItem.tsx'
import RadiotherapyItem from './components/itemList/items/RadiotherapyItem.tsx'
import { newProcedure } from './form/procedure.ts'
import ProcedureNavListItem from './components/navList/items/ProcedureNavListItem.tsx'
import ProcedureItem from './components/itemList/items/ProcedureItem.tsx'
import StemCellTransplantItem from './components/itemList/items/StemCellTransplantItem.tsx'
import { newStemCellTransplant } from './form/stemCellTransplant.ts'
import StemCellTransplantNavListItem from './components/navList/items/StemCellTransplantNavListItem.tsx'

export default function App() {
    const {setColorScheme} = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navCollapsed, {toggle: toggleNavCollapsed}] = useDisclosure(true)
    const [currentPage, setCurrentPage] = useState('start')
    const navContextValue = useMemo(() => ({currentPage, setCurrentPage}), [currentPage, setCurrentPage])

    const form = useForm({
        mode: 'uncontrolled',
        cascadeUpdates: true,
        initialValues: {
            diagnoses: [],
            treatments: [],
            chemotherapies: [],
            radiotherapies: [],
            procedures: [],
            stemCellTransplants: []
        }
    })

    const formValues = form.getValues()

    const handleReset = () => form.reset()

    const saveData = (values: typeof form.values) => {
        console.log(JSON.stringify(values))
    }

    const handleSave = () => {
        form.onSubmit(saveData)()
    }

    const handleLoad = () => {
        console.log('Load')
    }

    const getDisplayedPage = <T extends ListItem>(array: T[], path: string, ItemComponent: ComponentType<ItemProps<T>>) => 
        array.map((item, index) =>
            currentPage === getPageKey(path, item.id) &&
            <ItemComponent key={item.id} path={path} index={index} item={item} />
        )

    return (
        <FormProvider form={form}>
            <NavContext value={navContextValue}>
                <AppShell
                    header={{height: 60}}
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
                                items={formValues.diagnoses}
                                path="diagnoses"
                                itemFactory={newDiagnosis}
                                ItemComponent={DiagnosisNavListItem}
                                title="Diagnoosit"
                                emptyText="Ei diagnooseja"
                                addButtonText="Lisää diagnoosi"
                            />
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
                            />
                        </AppShell.Section>
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <Container ml={0} size="md">
                            {currentPage === 'start' && <Start />}
                            {getDisplayedPage(formValues.diagnoses, 'diagnoses', DiagnosisItem)}
                            {getDisplayedPage(formValues.treatments, 'treatments', TreatmentItem)}
                            {getDisplayedPage(formValues.chemotherapies, 'chemotherapies', ChemoItem)}
                            {getDisplayedPage(formValues.radiotherapies, 'radiotherapies', RadiotherapyItem)}
                            {getDisplayedPage(formValues.procedures, 'procedures', ProcedureItem)}
                            {getDisplayedPage(formValues.stemCellTransplants, 'stemCellTransplants', StemCellTransplantItem)}
                        </Container>
                    </AppShell.Main>
                </AppShell>
            </NavContext>
        </FormProvider>
    )
}
