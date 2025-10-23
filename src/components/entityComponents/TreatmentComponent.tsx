import { Group, Select, TextInput } from "@mantine/core";
import { EntityComponentProps } from "./entityComponentProps";
import { DateInput } from "@mantine/dates";
import { observer } from "mobx-react";
import { Treatment } from "../../store/entity/treatment";
import { toComboboxData } from "../../utils/selectOptionListUtils";
import { use } from "react";
import { StoreContext } from "../../store/StoreContext";

const TreatmentComponent = observer(({ data }: EntityComponentProps<Treatment>) => {
    const store = use(StoreContext)
    const treatmentStopReasonOptionsData = toComboboxData(store.data.treatmentStopReasonOptions, true, true)

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
                    placeholder="Aloituspäivä"
                />
                <DateInput
                    value={data.endDate}
                    onChange={value => data.setEndDate(value)}
                    label="Lopetuspäivä"
                    placeholder="Lopetuspäivä"
                />
            </Group>
            <TextInput
                value={data.group}
                onChange={e => data.setGroup(e.target.value)}
                label="Hoitoryhmä"
                placeholder="Esim. 'Intermediate Risk - High'"
            />
            <Group grow preventGrowOverflow={false}>
                <Select
                    value={data.stopReason}
                    onChange={value => data.setStopReason(value ?? '')}
                    data={treatmentStopReasonOptionsData}
                    label="Hoidon loppumisen syy"
                    w={200}
                    flex="none"
                />
                <TextInput
                    value={data.stopReasonOther}
                    onChange={e => data.setStopReasonOther(e.target.value)}
                    label=" "
                    placeholder="Muu, mikä?"
                    disabled={data.stopReason !== 'other'}
                />
            </Group>
        </>
    )
})

export default TreatmentComponent