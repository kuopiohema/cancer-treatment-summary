import { Autocomplete, Group, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { observer } from "mobx-react";
import { use } from "react";
import { Treatment } from "../../store/entity/treatment";
import { StoreContext } from "../../store/StoreContext";
import { EntityComponentProps } from "./entityComponentProps";

const TreatmentComponent = observer(({ data }: EntityComponentProps<Treatment>) => {
    const store = use(StoreContext)

    return (
        <>
            <TextInput
                value={data.protocol}
                onChange={e => data.setProtocol(e.target.value)}
                label="Protokolla tai julkaisu"
                placeholder="Esim. 'ALLTogether' tai 'Shankar et al. Eur J Cancer. 2012 Jul;48(11):1700-6'"
                flex="none"
            />
            <Group>
                <DateInput
                    value={data.startDate}
                    onChange={value => data.setStartDate(value)}
                    label="Aloituspäivä"
                />
                <DateInput
                    value={data.endDate}
                    onChange={value => data.setEndDate(value)}
                    label="Lopetuspäivä"
                />
            </Group>
            <TextInput
                value={data.group}
                onChange={e => data.setGroup(e.target.value)}
                label="Hoitoryhmä"
                placeholder="Esim. 'Intermediate Risk - High'"
            />
            <Autocomplete
                value={data.stopReason}
                onChange={value => data.setStopReason(value)}
                data={store.data.treatmentStopReasonOptions}
                label="Hoidon loppumisen syy"
            />
        </>
    )
})

export default TreatmentComponent