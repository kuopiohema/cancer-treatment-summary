import { Autocomplete, Group, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { observer } from "mobx-react-lite"
import { use } from "react"
import { Treatment } from "../../../store/entity/treatment"
import { StoreContext } from "../../../store/StoreContext"
import { EntityPageProps } from "./entityPageProps"

const TreatmentPage = observer(({ entity }: EntityPageProps<Treatment>) => {
    const { data } = use(StoreContext)

    return (
        <>
            <TextInput
                value={entity.protocol}
                onChange={e => { entity.protocol = e.target.value }}
                label="Protokolla tai julkaisu"
                placeholder="Esim. 'ALLTogether' tai 'Shankar et al. Eur J Cancer. 2012 Jul;48(11):1700-6'"
                flex="none"
            />
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
            <TextInput
                value={entity.group}
                onChange={e => { entity.group = e.target.value }}
                label="Hoitoryhmä"
                placeholder="Esim. 'Intermediate Risk - High'"
            />
            <Autocomplete
                value={entity.stopReason}
                onChange={value => { entity.stopReason = value }}
                data={data.treatmentStopReasonOptions}
                label="Hoidon loppumisen syy"
            />
        </>
    )
})

export default TreatmentPage