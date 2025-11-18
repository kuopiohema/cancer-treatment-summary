import {Button, Divider, Grid, Group, Text, Textarea, Title} from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { use, useMemo } from 'react'
import { Followup as FollowupData } from '../../store/followup'
import { StoreContext } from '../../store/StoreContext'
import { EntityPageProps } from '../entities/pages/entityPageProps'
import EntityPageWrapper from '../entityLists/EntityPageWrapper'

const FollowupPage = observer(({ entity: data }: EntityPageProps<FollowupData>) => {
    const store = use(StoreContext)

    const defaults = useMemo(() => store.data.followupDefaults, [store.data.followupDefaults])

    const handleAddToGeneral = (value: string) => {
        let newText = data.general
        if (newText)
            newText = newText.concat('\n')
        newText = newText.concat(value)
        data.general = newText
    }

    const handleAddToVaccination = (value: string) => {
        let newText = data.vaccination
        if (newText)
            newText = newText.concat('\n')
        newText = newText.concat(value)
        data.vaccination = newText
    }

    return <>
        <Textarea
            value={data.general}
            onChange={e => { data.general = e.target.value }}
            label="Yleisohjeet"
            minRows={3}
        />
        <Textarea
            value={data.vaccination}
            onChange={e => { data.vaccination = e.target.value }}
            label="Rokotusohjeet"
            minRows={3}
        />
        <Divider />
        <Title order={2}>Vakiotekstit</Title>
        <Title order={3}>Yleisohjeet</Title>
        <Grid align="center">
            <Grid.Col span={3}>
                <Text style={{textAlign: 'right'}}>Yleiset asiat:</Text>
            </Grid.Col>
            <Grid.Col span={9}>
                <Group>
                    <Button onClick={() => handleAddToGeneral(defaults.growth)}>Kasvu</Button>
                    <Button onClick={() => handleAddToGeneral(defaults.bloodPressure)}>Verenpaine</Button>
                    <Button onClick={() => handleAddToGeneral(defaults.lifestyle)}>Elämäntavat</Button>
                </Group>
            </Grid.Col>
            <Grid.Col span={3}>
                <Text style={{textAlign: 'right'}}>Sydänseuranta (poika):</Text>
            </Grid.Col>
            <Grid.Col span={9}>
                <Group>
                    <Button onClick={() => handleAddToGeneral(defaults.heart.boy.lowRisk)}>Matala riski</Button>
                    <Button onClick={() => handleAddToGeneral(defaults.heart.boy.mediumRisk)}>Keskiriski</Button>
                    <Button onClick={() => handleAddToGeneral(defaults.heart.boy.highRisk)}>Korkea riski</Button>
                </Group>
            </Grid.Col>
            <Grid.Col span={3}>
                <Text style={{textAlign: 'right'}}>Sydänseuranta (tyttö):</Text>
            </Grid.Col>
            <Grid.Col span={9}>
                <Group>
                    <Button onClick={() => handleAddToGeneral(defaults.heart.girl.lowRisk)}>Matala riski</Button>
                    <Button onClick={() => handleAddToGeneral(defaults.heart.girl.mediumRisk)}>Keskiriski</Button>
                    <Button onClick={() => handleAddToGeneral(defaults.heart.girl.highRisk)}>Korkea riski</Button>
                </Group>
            </Grid.Col>
        </Grid>
        <Title order={3} mt="lg">Rokotusohjeet</Title>
        <Grid align="center">
            <Grid.Col span={3}>
                <Text style={{textAlign: 'right'}}>Rokotusohjelma:</Text>
            </Grid.Col>
            <Grid.Col span={9}>
                <Group>
                    <Button onClick={() => handleAddToVaccination(defaults.vaccination.unvaccinated)}>Aiemmin rokottamaton</Button>
                    <Button onClick={() => handleAddToVaccination(defaults.vaccination.interrupted)}>Rokotusohjelma keskeytynyt</Button>
                    <Button onClick={() => handleAddToVaccination(defaults.vaccination.influenza)}>Influenssarokotus</Button>
                    <Button onClick={() => handleAddToVaccination(defaults.vaccination.autoSCT)}>Autologinen siirto</Button>
                    <Button onClick={() => handleAddToVaccination(defaults.vaccination.alloSCT)}>Allogeeninen siirto</Button>
                </Group>
            </Grid.Col>
            <Grid.Col span={3}>
                <Text style={{textAlign: 'right'}}>Rokottamisajankohta:</Text>
            </Grid.Col>
            <Grid.Col span={9}>
                <Group>
                    <Button onClick={() => handleAddToVaccination(defaults.vaccination.standardRisk)}>Normaali riski</Button>
                    <Button onClick={() => handleAddToVaccination(defaults.vaccination.highRisk)}>Korkea riski (HR-ALL, AML)</Button>
                </Group>
            </Grid.Col>
        </Grid>
    </>
})

const Followup = observer(() => {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Seurantaohjeet</Title>
            <Text mb="xl">
                Syötä tälle sivulle yleiset seurantaohjeet sekä rokotusohjeet. Käytä halutessasi vakiotekstejä ja täydennä vapaalla tekstillä tarpeen mukaan.
            </Text>
            <EntityPageWrapper entity={store.form.followup} InnerComponent={FollowupPage} />
        </>
    )
})

export default Followup