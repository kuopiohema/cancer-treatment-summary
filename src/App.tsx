import '@mantine/core/styles.css'

import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
    Divider,
    Group,
    NavLink,
    Text,
    useComputedColorScheme,
    useMantineColorScheme
} from '@mantine/core'
import {IconDeviceFloppy, IconFile, IconFileWord, IconFolderOpen, IconMoon, IconPlus, IconSun, IconTrash} from '@tabler/icons-react'
import {useDisclosure} from '@mantine/hooks'
import {useState} from 'react'
import Start from './pages/Start'
import {FormProvider, newDiagnosis, newProtocol, useForm} from './formContext.ts'
import DiagnosisItem from './components/DiagnosisItem.tsx'
import { DragDropContext } from '@hello-pangea/dnd'

export default function App() {
    const {setColorScheme} = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navCollapsed, {toggle: toggleNavCollapsed}] = useDisclosure(true)
    const [currentTab, setCurrentTab] = useState('start')

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
        console.log(JSON.stringify(form.getValues()))
    }

    const handleLoad = () => {
        console.log('Load')
    }

    return (
        <FormProvider form={form}>
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
                        active={currentTab === "start"}
                        onClick={() => setCurrentTab("start")}
                    />
                    <Divider my="xs" />
                    <Group px={8} justify="space-between">
                        <Text>Diagnoosit</Text>
                        <ActionIcon 
                            variant="subtle"
                            onClick={() => form.insertListItem('diagnoses', newDiagnosis())}
                        >
                            <IconPlus />
                        </ActionIcon>
                    </Group>
                    <DragDropContext
                        onDragEnd={({ destination, source }) =>
                            destination?.index !== undefined && form.reorderListItem('diagnoses', { from: source.index, to: destination.index })
                        }
                    >
                    {formValues.diagnoses.map((item, index) => (
                        <NavLink
                            href="#"
                            key={item.key}
                            label={item.icd10 || '(Tuntematon diagnoosi)'}
                            active={currentTab === `diagnosis-${item.key}`}
                            onClick={() => setCurrentTab(`diagnosis-${item.key}`)}
                            rightSection={
                                <ActionIcon
                                    variant="subtle"
                                    color="red"
                                    onClick={() => form.removeListItem('diagnoses', index)}
                                >
                                    <IconTrash />
                                </ActionIcon>
                            }
                        />
                    ))}
                    </DragDropContext>
                </AppShell.Navbar>
                <AppShell.Main>
                    {currentTab === 'start' && <Start />}
                    {formValues.diagnoses.map((item, index) =>
                        currentTab === `diagnosis-${item.key}` &&
                        <DiagnosisItem key={item.key} index={index} />
                    )}
                </AppShell.Main>
            </AppShell>
        </FormProvider>
    )
}
