import { Button, Divider, Group, Text, Textarea, Title } from '@mantine/core'
import { observer } from 'mobx-react'
import { use, useMemo } from 'react'
import { Followup as FollowupData } from '../../store/followup'
import { StoreContext } from '../../store/StoreContext'
import { EntityComponentProps } from '../entities/entityComponentProps'
import EntityPage from '../entityLists/EntityPage'

const FollowupPage = observer(({ data }: EntityComponentProps<FollowupData>) => {
    const store = use(StoreContext)

    const defaults = useMemo(() => store.data.followupDefaults, [store.data.followupDefaults])

    const handleAddToGeneral = (value: string) => {
        let newText = data.general
        if (newText)
            newText = newText.concat('\n')
        newText = newText.concat(value)
        data.setGeneral(newText)
    }

    const handleAddToVaccination = (value: string) => {
        let newText = data.vaccination
        if (newText)
            newText = newText.concat('\n')
        newText = newText.concat(value)
        data.setVaccination(newText)
    }

    return <>
        <Textarea
            value={data.general}
            onChange={e => data.setGeneral(e.target.value)}
            label="Yleisohjeet"
            minRows={3}
        />
        <Textarea
            value={data.vaccination}
            onChange={e => data.setVaccination(e.target.value)}
            label="Rokotusohjeet"
            minRows={3}
        />
        <Divider />
        <Title order={2}>Vakiotekstit</Title>
        <Title order={3}>Yleisohjeet</Title>
        <Group>
            <Text>Yleiset asiat:</Text>
            <Button onClick={() => handleAddToGeneral(defaults.growth)}>Kasvu</Button>
            <Button onClick={() => handleAddToGeneral(defaults.bloodPressure)}>Verenpaine</Button>
            <Button onClick={() => handleAddToGeneral(defaults.lifestyle)}>Elämäntavat</Button>
        </Group>
        <Group>
            <Text>Sydänseuranta (poika):</Text>
            <Button onClick={() => handleAddToGeneral(defaults.heart.boy.lowRisk)}>Matala riski</Button>
            <Button onClick={() => handleAddToGeneral(defaults.heart.boy.mediumRisk)}>Keskiriski</Button>
            <Button onClick={() => handleAddToGeneral(defaults.heart.boy.highRisk)}>Korkea riski</Button>
        </Group>
        <Group>
            <Text>Sydänseuranta (tyttö):</Text>
            <Button onClick={() => handleAddToGeneral(defaults.heart.girl.lowRisk)}>Matala riski</Button>
            <Button onClick={() => handleAddToGeneral(defaults.heart.girl.mediumRisk)}>Keskiriski</Button>
            <Button onClick={() => handleAddToGeneral(defaults.heart.girl.highRisk)}>Korkea riski</Button>
        </Group>
        <Title order={4}>Rokotusohjeet</Title>
        <Group>
            <Text>Rokotusohjelma:</Text>
            <Button onClick={() => handleAddToVaccination(defaults.vaccination.unvaccinated)}>Aiemmin rokottamaton</Button>
            <Button onClick={() => handleAddToVaccination(defaults.vaccination.interrupted)}>Rokotusohjelma keskeytynyt</Button>
            <Button onClick={() => handleAddToVaccination(defaults.vaccination.influenza)}>Influenssarokotus</Button>
        </Group>
        <Group>
            <Text>Rokottamisajankohta:</Text>
            <Button onClick={() => handleAddToVaccination(defaults.vaccination.standardRisk)}>Normaali riski</Button>
            <Button onClick={() => handleAddToVaccination(defaults.vaccination.highRisk)}>Korkea riski (HR-ALL, AML)</Button>
        </Group>
        <Group>
            <Text>Kantasolusiirron saanut:</Text>
            <Button onClick={() => handleAddToVaccination(defaults.vaccination.autoSCT)}>Autologinen siirto</Button>
            <Button onClick={() => handleAddToVaccination(defaults.vaccination.alloSCT)}>Allogeeninen siirto</Button>
        </Group>
    </>
})

const Followup = () => {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Seurantaohjeet</Title>
            <Text mb="xl">
                Syötä tälle sivulle yleiset seurantaohjeet sekä rokotusohjeet. Käytä halutessasi vakiotekstejä ja täydennä vapaalla tekstillä tarpeen mukaan.
            </Text>
            <EntityPage entity={store.form.followup} InnerComponent={FollowupPage} />
        </>
    )
}

export default Followup