import {Group, Select, Stack, TextInput} from '@mantine/core'
import type {Treatment} from '../../../form/treatment.ts'
import type {ItemProps} from '../../../types/itemProps.ts'
import { useFormContext } from '../../../form/formContext.ts'
import { DateInput } from '@mantine/dates'
import { useState } from 'react'
import { toComboboxData } from '../../../data/dataUtils.ts'
import { stopReasonOptions, type StopReasonValue } from '../../../data/stopReasonOptions.ts'
import getListItemPath from '../../../utils/getListItemPath.ts'

export default function TreatmentItem({path, index, item}: ItemProps<Treatment>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const stopReasonOptionsData = toComboboxData(stopReasonOptions)

    const [stopReason, setStopReason] = useState(item.stopReason)
    form.watch(`${itemPath}.stopReason`, ({value}: { value: StopReasonValue }) => setStopReason(value))

    return (
        <Stack gap="sm" w="600px">
            <TextInput
                key={form.key(`${itemPath}.protocol`)}
                {...form.getInputProps(`${itemPath}.protocol`)}
                label="Protokolla tai julkaisu"
                placeholder="Esim. 'ALLTogether' tai 'Shankar et al. Eur J Cancer. 2012 Jul;48(11):1700-6'"
                flex="none"
            />
            <TextInput
                key={form.key(`${itemPath}.group`)}
                {...form.getInputProps(`${itemPath}.group`)}
                label="Hoitoryhmä"
                placeholder="Esim. 'Intermediate Risk - High'"
            />
            <Group>
                <DateInput
                    key={form.key(`${itemPath}.startDate`)}
                    {...form.getInputProps(`${itemPath}.startDate`)}
                    label="Aloituspäivä"
                    placeholder="Aloituspäivä"
                />

                <DateInput
                    key={form.key(`${itemPath}.endDate`)}
                    {...form.getInputProps(`${itemPath}.endDate`)}
                    label="Lopetuspäivä"
                    placeholder="Lopetuspäivä"
                />
            </Group>
            <Group grow preventGrowOverflow={false}>
                <Select
                    key={form.key(`${itemPath}.stopReason`)}
                    {...form.getInputProps(`${itemPath}.stopReason`)}
                    label="Hoidon loppumisen syy"
                    data={stopReasonOptionsData}
                    w={200}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${itemPath}.stopReasonOther`)}
                    {...form.getInputProps(`${itemPath}.stopReasonOther`)}
                    label=" "
                    placeholder="Muu, mikä?"
                    disabled={stopReason !== 'other'}
                />
            </Group>
        </Stack>
    )
}