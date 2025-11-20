import { Autocomplete, Group, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { observer } from "mobx-react-lite"
import { Treatment } from "../../../store/entity/treatment"
import { EntityPageProps } from "./entityPageProps"
import { useQuery } from "@tanstack/react-query"
import { fetchSelectOptions } from "../../../utils/fetchJson"
import { withUnknown } from "../../../utils/withUnknown"

const TreatmentPage = observer(({ entity }: EntityPageProps<Treatment>) => {
    const treatmentStopReasonOptions = useQuery({
        queryKey: ['treatmentStopReason'],
        queryFn: fetchSelectOptions,
        select: data => withUnknown(data)
    })

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
                data={treatmentStopReasonOptions.data}
                label="Hoidon loppumisen syy"
            />
        </>
    )
})

export default TreatmentPage