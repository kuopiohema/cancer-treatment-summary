import { Divider, Group, List, Text } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { observer } from 'mobx-react-lite'
import { use } from 'react'
import { DataContext } from '../../../data/DataContext.ts'
import { Chemotherapy } from '../../../store/entities/chemotherapy'
import { Drug } from '../../../store/entities/drug'
import { firstLetterUppercase } from '../../../utils/firstLetterUppercase'
import ChildList from '../../entityLists/ChildList'
import DrugListItem from '../listItems/DrugListItem'
import { EntityPageProps } from './entityPageProps'

const ChemotherapyPage = observer(({ entity }: EntityPageProps<Chemotherapy>) => {
    const data = use(DataContext)
    if (!data)
        throw new Error('Data context missing!')

    const doxoEquivalents = data.store.doxoEquivalents
    //const [cycloEquivalents] = useState(store.data.cycloEquivalents)

    return (
        <>
            <Group>
                <DateInput
                    value={entity.startDate}
                    onChange={value => entity.set('startDate', value)}
                    label="Aloituspäivä"
                />
                <DateInput
                    value={entity.endDate}
                    onChange={value => entity.set('endDate', value)}
                    label="Lopetuspäivä"
                />
            </Group>
            <ChildList
                entityList={entity.drugs}
                entityFactory={() => new Drug({})}
                title="Lääkkeet"
                emptyText="Ei lääkkeitä"
                itemName="lääke"
                ListItemComponent={DrugListItem}
            />
            <Divider orientation="horizontal" />
            <Text>Kumulatiivinen antrasykliiniannos (doksorubisiiniekvivalentti) = {entity.doxoEquivalent} mg/m²</Text>
            <Text size="xs">Käytetyt kertoimet:</Text>
            <List size="xs">
                {doxoEquivalents.drugs.map(item => (
                    <List.Item key={item.drug}>{firstLetterUppercase(item.drug)}: {item.factor}</List.Item>
                ))}
            </List>
            <Text size="xs">Lähde: {doxoEquivalents.source}</Text>
            <Text>HUOM: lääkkeiden nimet on kirjoitettava oikein, jotta (kumulatiivisen) antrasykliiniannoksen laskeminen toimii!</Text>
            {/*<Divider orientation="horizontal" />
            <Text>Kumulatiivinen alkyloivien aineiden annos (syklofosfamidiekvivalentti) = {data.cycloEquivalent} mg/m²<br /></Text>
            <Text size="xs">Käytetyt kertoimet:</Text>
            <List size="xs">
                {cycloEquivalents.drugs.map(item => (
                    <List.Item key={item.drug}>{firstLetterUppercase(item.drug)}: {item.factor}</List.Item>
                ))}
            </List>
            <Text size="xs">Lähde: {cycloEquivalents.source}</Text>*/}
        </>
    )
})

export default ChemotherapyPage