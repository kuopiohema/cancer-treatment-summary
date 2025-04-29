import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

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
import {IconDeviceFloppy, IconFile, IconFileWord, IconFolderOpen, IconMoon, IconSun} from '@tabler/icons-react'
import {useDisclosure} from '@mantine/hooks'
import {type ReactNode, useState} from 'react'
import Start from './pages/Start'
import Treatments from './pages/Treatments.tsx'
import {FormProvider, newDiagnosis, newProtocol, useForm} from './formContext.ts'


const tabs: { label: string, component: ReactNode }[] = [
    {
        label: 'Aloitus',
        component: <Start />
    },
    {
        label: 'Diagnoosit ja hoidot',
        component: <Treatments />
    }
]

export default function App() {
    const {setColorScheme} = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme('light')
    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    const [navCollapsed, {toggle: toggleNavCollapsed}] = useDisclosure(true)
    const [currentTab, setCurrentTab] = useState(0)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            treatments: {
                diagnoses: [newDiagnosis()],
                protocols: [newProtocol()]
            }
        }
    })

    const handleSave = () => {
        console.log(JSON.stringify(form.getValues()))
    }

    const handleLoad = () => {
        console.log('Load')
    }

    return (
        <AppShell
            header={{height: 60}}
            navbar={{
                width: 200,
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
                {tabs.map((tab, index) => (
                    <NavLink
                        href="#"
                        key={tab.label}
                        label={tab.label}
                        active={currentTab === index}
                        onClick={() => {
                            setCurrentTab(index)
                        }}
                    />
                ))}
            </AppShell.Navbar>
            <AppShell.Main>
                <FormProvider form={form}>
                    {tabs[currentTab].component}
                </FormProvider>
            </AppShell.Main>
        </AppShell>
    )
}
