import { Group } from "@mantine/core"
import { Chemotherapy } from "../../store/chemotherapy"
import { EntityComponentProps } from "./entityComponentProps"
import { DateInput } from "@mantine/dates"
import { observer } from "mobx-react"
import ChildList from "../entityLists/ChildList"
import { Drug } from "../../store/drug"
import DrugComponent from "./DrugComponent"

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
        </>
    )
})

export default ChemotherapyComponent