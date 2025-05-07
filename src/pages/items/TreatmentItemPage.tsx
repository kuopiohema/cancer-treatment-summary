import type {ItemPageProps} from './itemPageProps.ts'
import {useFormContext} from '../../formContext.ts'
import ItemPage from '../ItemPage.tsx'
import {useState} from 'react'
import {ComboboxData, Divider, Select, Switch, TextInput} from '@mantine/core'
import FormRow from '../../components/FormRow.tsx'
import FormattedDateInput from '../../components/FormattedDateInput.tsx'

const stopReasonOptions: ComboboxData = [
    {value: 'completed', label: 'Hoito päättynyt'},
    {value: 'toxicity', label: 'Toksisuus'},
    {value: 'refractory', label: 'Riittämätön hoitovaste'},
    {value: 'relapse', label: 'Relapsi'},
    {value: 'unknown', label: 'Ei tiedossa'},
    {value: 'other', label: 'Muu, mikä?'}
]

export default function TreatmentItemPage({index}: ItemPageProps) {
    const form = useFormContext()
    const key = `treatments.${index}`

    const values = form.getValues().treatments[index]

    const [stopReason, setStopReason] = useState(values.stopReason)
    form.watch(`${key}.stopReason`, ({value}) => {
        if (typeof value === 'string')
            setStopReason(value)
    })

    return (
        <ItemPage>
            <TextInput
                key={form.key(`${key}.protocol`)}
                {...form.getInputProps(`${key}.protocol`)}
                label="Protokolla tai julkaisu"
                placeholder="Protokolla tai julkaisu, esim. 'ALLTogether' tai 'Shankar et al. Eur J Cancer. 2012 Jul;48(11):1700-6'"
                flex="none"
            />
            <TextInput
                key={form.key(`${key}.group`)}
                {...form.getInputProps(`${key}.group`)}
                label="Hoitoryhmä"
                placeholder="Hoitoryhmä, esim. 'Intermediate Risk - High'"
            />
            <FormRow>
                <FormattedDateInput
                    key={form.key(`${key}.startDate`)}
                    {...form.getInputProps(`${key}.startDate`)}
                    label="Aloituspäivä"
                    placeholder="Aloituspäivä"
                />
                <FormattedDateInput
                    key={form.key(`${key}.endDate`)}
                    {...form.getInputProps(`${key}.endDate`)}
                    label="Lopetuspäivä"
                    placeholder="Lopetuspäivä"
                />
            </FormRow>
            <FormRow>
                <Select
                    key={form.key(`${key}.stopReason`)}
                    {...form.getInputProps(`${key}.stopReason`)}
                    label="Hoidon loppumisen syy"
                    data={stopReasonOptions}
                    w={200}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${key}.stopReasonOther`)}
                    {...form.getInputProps(`${key}.stopReasonOther`)}
                    disabled={stopReason !== 'other'}
                />
            </FormRow>
            <Divider my="sm" />
            <Switch
                key={form.key(`${key}.chemotherapy`)}
                {...form.getInputProps(`${key}.chemotherapy`, {type: 'checkbox'})}
                label="Kemoterapia"
            />
        </ItemPage>
    )
}