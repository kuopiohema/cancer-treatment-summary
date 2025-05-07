import '@mantine/core/styles.css'

import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
    Group,
    NavLink,
    Text,
    useComputedColorScheme,
    useMantineColorScheme
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDeviceFloppy, IconFile, IconFileWord, IconFolderOpen, IconMoon, IconSun } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import DiagnosisNavList from './components/diagnosis/DiagnosisNavList.tsx'
import DiagnosisItem from './components/DiagnosisItem.tsx'
import { FormProvider, newDiagnosis, newProtocol, useForm } from './formContext.ts'
import Start from './pages/Start'
import { NavContext } from './navContext.tsx'

export default function App() {
    const {setColorScheme} = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navCollapsed, {toggle: toggleNavCollapsed}] = useDisclosure(true)
    const [currentPage, setCurrentPage] = useState('start')
    const navContextValue = useMemo(() => ({ currentPage, setCurrentPage }), [currentPage, setCurrentPage])

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            diagnoses: [newDiagnosis()],
            treatments: {
                protocols: [newProtocol()]
            }
        }
    })

    const formValues = form.getValues()

    const handleSave = () => {
        console.log(JSON.stringify(formValues))
    }

    const handleLoad = () => {
        console.log('Load')
    }

    return (
        <FormProvider form={form}>
            <NavContext value={navContextValue}>
                <AppShell
                    header={{height: 60}}
                    navbar={{
                        width: 300,
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
                                <Button variant="default" leftSection={<IconFile size={20} />}>Uusi</Button>
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
                                <Button variant="default" leftSection={<IconFileWord size={20} />}>Luo Word-tiedosto</Button>
                            </Group>
                            <ActionIcon variant="subtle" onClick={toggleColorScheme}>
                                {computedColorScheme === 'dark' ? <IconSun /> : <IconMoon />}
                            </ActionIcon>
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar>
                        <NavLink
                            href="#"
                            label="Aloitus"
                            active={currentPage === "start"}
                            onClick={() => setCurrentPage("start")}
                        />
                        <DiagnosisNavList />
                    </AppShell.Navbar>
                    <AppShell.Main>
                        {currentPage === 'start' && <Start />}
                        {formValues.diagnoses.map((item, index) =>
                            currentPage === `diagnoses-${item.id}` &&
                            <DiagnosisItem key={item.id} index={index} />
                        )}
                    </AppShell.Main>
                </AppShell>
            </NavContext>
        </FormProvider>
    )
}
