import { Group, Select, TextInput } from "@mantine/core";
import { Treatment } from "../../../../types/form/treatment";
import { ItemPageInnerProps } from "../itemPageInnerProps";
import { DateInput } from "@mantine/dates";
import { stopReasonOptions, StopReasonValue } from "../../../../data/stopReasonOptions";
import { toComboboxData } from "../../../../data/dataUtils";

const TreatmentPage = ({ data, onUpdate }: ItemPageInnerProps<Treatment>) => {
    const stopReasonOptionsData = toComboboxData(stopReasonOptions)

    return (
        <>
            <TextInput
                value={data.protocol}
                onChange={e => onUpdate('protocol', e.target.value)}
                label="Protokolla tai julkaisu"
                placeholder="Esim. 'ALLTogether' tai 'Shankar et al. Eur J Cancer. 2012 Jul;48(11):1700-6'"
                flex="none"
            />
            <TextInput
                value={data.group}
                onChange={e => onUpdate('group', e.target.value)}
                label="Hoitoryhmä"
                placeholder="Esim. 'Intermediate Risk - High'"
            />
            <Group>
                <DateInput
                    value={data.startDate}
                    onChange={value => onUpdate('startDate', value)}
                    label="Aloituspäivä"
                    placeholder="Aloituspäivä"
                />
                <DateInput
                    value={data.endDate}
                    onChange={value => onUpdate('endDate', value)}
                    label="Lopetuspäivä"
                    placeholder="Lopetuspäivä"
                />
            </Group>
            <Group grow preventGrowOverflow={false}>
                <Select
                    value={data.stopReason}
                    onChange={value => value && onUpdate('stopReason', value as StopReasonValue)}
                    data={stopReasonOptionsData}
                    label="Hoidon loppumisen syy"
                    w={200}
                    flex="none"
                />
                <TextInput
                    value={data.stopReasonOther}
                    onChange={e => onUpdate('stopReasonOther', e.target.value)}
                    label=" "
                    placeholder="Muu, mikä?"
                    disabled={data.stopReason !== 'other'}
                />
            </Group>
        </>
    )
}

export default TreatmentPage