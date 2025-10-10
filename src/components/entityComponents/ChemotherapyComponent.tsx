import { Group, Text } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { observer } from "mobx-react"
import { Chemotherapy } from "../../store/entity/chemotherapy"
import { Drug } from "../../store/entity/drug"
import ChildList from "../entityLists/ChildList"
import DrugComponent from "./DrugComponent"
import { EntityComponentProps } from "./entityComponentProps"

const ChemotherapyComponent = observer(({ data }: EntityComponentProps<Chemotherapy>) => {
    return (
        <>
            <Group>
                <DateInput
                    value={data.startDate}
                    onChange={value => data.setStartDate(value)}
                    label="Aloituspäivä"
                    placeholder="Aloituspäivä"
                />
                <DateInput
                    value={data.endDate}
                    onChange={value => data.setEndDate(value)}
                    label="Lopetuspäivä"
                    placeholder="Lopetuspäivä"
                />
            </Group>
            <ChildList
                entityList={data.drugs}
                entityFactory={() => new Drug({})}
                title="Lääkkeet"
                emptyText="Ei lääkkeitä"
                addButtonText="Lisää lääke"
                ListItemComponent={DrugComponent}
            />
            <Text>Kumulatiivinen antrasykliiniannos: {data.doxoEquivalent} mg/m² (doksorubisiiniekvivalentti)</Text>
        </>
    )
})

export default ChemotherapyComponent