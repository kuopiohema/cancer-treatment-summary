import { Divider, Group, List, Text } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { observer } from "mobx-react-lite"
import { Chemotherapy } from "../../../store/entity/chemotherapy"
import { Drug } from "../../../store/entity/drug"
import ChildList from "../../entityLists/ChildList"
import DrugListItem from "../listItems/DrugListItem"
import { EntityPageProps } from "./entityPageProps"
import { firstLetterUppercase } from "../../../utils/firstLetterUppercase"
import { use, useState } from "react"
import { StoreContext } from "../../../store/StoreContext"

const ChemotherapyPage = observer(({ entity }: EntityPageProps<Chemotherapy>) => {
    const store = use(StoreContext)
    const [doxoEquivalents] = useState(store.data.doxoEquivalents)
    //const [cycloEquivalents] = useState(store.data.cycloEquivalents)
    return (
        <>
            <Group>
                <DateInput
                    value={entity.startDate}
                    onChange={value => { entity.startDate = value }}
                    label="Aloituspäivä"
                />
                <DateInput
                    value={entity.endDate}
                    onChange={value => { entity.endDate = value }}
                    label="Lopetuspäivä"
                />
            </Group>
            <ChildList
                entityList={entity.drugs}
                entityFactory={() => new Drug()}
                title="Lääkkeet"
                emptyText="Ei lääkkeitä"
                addButtonText="Lisää lääke"
                ListItemComponent={DrugListItem}
            />
            <Divider orientation="horizontal" />
            <Text>Kumulatiivinen antrasykliiniannos (doksorubisiiniekvivalentti) = {entity.doxoEquivalent} mg/m²<br /></Text>
            <Text size="xs">Käytetyt kertoimet:</Text>
            <List size="xs">
                {doxoEquivalents.drugs.map(item => (
                    <List.Item key={item.drug}>{firstLetterUppercase(item.drug)}: {item.factor}</List.Item>
                ))}
            </List>
            <Text size="xs">Lähde: {doxoEquivalents.source}</Text>
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