import { Group, Select, TextInput } from "@mantine/core";
import { Treatment } from "../../../types/form/treatment";
import { ItemPageInnerProps } from "../itemPageInnerProps";
import { DateInput } from "@mantine/dates";
import { stopReasonOptions, StopReasonValue } from "../../../data/stopReasonOptions";
import { toComboboxData } from "../../../data/dataUtils";

const TreatmentPage = ({ data: item, onUpdate }: ItemPageInnerProps<Treatment>) => {
    const stopReasonOptionsData = toComboboxData(stopReasonOptions)

    return (
        <>
            <TextInput
                value={item.protocol || ''}
                onChange={e => onUpdate('protocol', e.target.value)}
                label="Protokolla tai julkaisu"
                placeholder="Esim. 'ALLTogether' tai 'Shankar et al. Eur J Cancer. 2012 Jul;48(11):1700-6'"
                flex="none"
            />
            <Group>
                <DateInput
                    value={item.startDate}
                    onChange={value => onUpdate('startDate', value)}
                    label="Aloituspäivä"
                    placeholder="Aloituspäivä"
                />
                <DateInput
                    value={item.endDate}
                    onChange={value => onUpdate('endDate', value)}
                    label="Lopetuspäivä"
                    placeholder="Lopetuspäivä"
                />
            </Group>
            <TextInput
                value={item.group}
                onChange={e => onUpdate('group', e.target.value)}
                label="Hoitoryhmä"
                placeholder="Esim. 'Intermediate Risk - High'"
            />
            <Group grow preventGrowOverflow={false}>
                <Select
                    value={item.stopReason}
                    onChange={value => value && onUpdate('stopReason', value as StopReasonValue)}
                    data={stopReasonOptionsData}
                    label="Hoidon loppumisen syy"
                    w={200}
                    flex="none"
                />
                <TextInput
                    value={item.stopReasonOther}
                    onChange={e => onUpdate('stopReasonOther', e.target.value)}
                    label=" "
                    placeholder="Muu, mikä?"
                    disabled={item.stopReason !== 'other'}
                />
            </Group>
        </>
    )
}

export default TreatmentPage