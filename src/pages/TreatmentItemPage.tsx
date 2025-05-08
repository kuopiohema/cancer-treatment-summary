import type {ItemProps} from '../types/itemProps.ts'
import {newChemo, type Treatment, useFormContext} from '../formContext.ts'
import ItemPage from './ItemPage.tsx'
import {useState} from 'react'
import {Box, ComboboxData, Fieldset, Select, Switch, TextInput} from '@mantine/core'
import FormRow from '../components/FormRow.tsx'
import FormattedDateInput from '../components/FormattedDateInput.tsx'
import ItemList from '../components/ItemList.tsx'
import getListItemPath from '../utils/getListItemPath.ts'
import ChemoItem from '../components/items/ChemoItem.tsx'

const stopReasonOptions: ComboboxData = [
    {value: 'completed', label: 'Hoito päättynyt'},
    {value: 'toxicity', label: 'Toksisuus'},
    {value: 'refractory', label: 'Riittämätön hoitovaste'},
    {value: 'relapse', label: 'Relapsi'},
    {value: 'unknown', label: 'Ei tiedossa'},
    {value: 'other', label: 'Muu, mikä?'}
]

export default function TreatmentItemPage({path, index, item}: ItemProps<Treatment>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [stopReason, setStopReason] = useState(item.stopReason)
    form.watch(`${itemPath}.stopReason`, ({value}) => {
        if (typeof value === 'string')
            setStopReason(value)
    })

    const [chemoDone, setChemoDone] = useState(item.chemo.done)
    form.watch(`${itemPath}.chemo.done`, ({value}) => {
        if (typeof value === 'boolean')
            setChemoDone(value)
    })

    return (
        <ItemPage>
            <TextInput
                key={form.key(`${itemPath}.protocol`)}
                {...form.getInputProps(`${itemPath}.protocol`)}
                label="Protokolla tai julkaisu"
                placeholder="Protokolla tai julkaisu, esim. 'ALLTogether' tai 'Shankar et al. Eur J Cancer. 2012 Jul;48(11):1700-6'"
                flex="none"
            />
            <TextInput
                key={form.key(`${itemPath}.group`)}
                {...form.getInputProps(`${itemPath}.group`)}
                label="Hoitoryhmä"
                placeholder="Hoitoryhmä, esim. 'Intermediate Risk - High'"
            />
            <FormRow>
                <FormattedDateInput
                    key={form.key(`${itemPath}.startDate`)}
                    {...form.getInputProps(`${itemPath}.startDate`)}
                    label="Aloituspäivä"
                    placeholder="Aloituspäivä"
                />
                <FormattedDateInput
                    key={form.key(`${itemPath}.endDate`)}
                    {...form.getInputProps(`${itemPath}.endDate`)}
                    label="Lopetuspäivä"
                    placeholder="Lopetuspäivä"
                />
            </FormRow>
            <FormRow>
                <Select
                    key={form.key(`${itemPath}.stopReason`)}
                    {...form.getInputProps(`${itemPath}.stopReason`)}
                    label="Hoidon loppumisen syy"
                    data={stopReasonOptions}
                    w={200}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${itemPath}.stopReasonOther`)}
                    {...form.getInputProps(`${itemPath}.stopReasonOther`)}
                    placeholder="Muu, mikä?"
                    disabled={stopReason !== 'other'}
                />
            </FormRow>
            <Fieldset legend="Kemoterapia">
                <Switch
                    key={form.key(`${itemPath}.chemo.done`)}
                    {...form.getInputProps(`${itemPath}.chemo.done`, {type: 'checkbox'})}
                    label="Kemoterapia annettu"
                />
                {chemoDone && (
                    <Box pt="md">
                        <FormRow>
                            <FormattedDateInput
                                key={form.key(`${itemPath}.chemo.startDate`)}
                                {...form.getInputProps(`${itemPath}.chemo.startDate`)}
                                label="Aloituspäivä"
                                placeholder="Aloituspäivä"
                            />
                            <FormattedDateInput
                                key={form.key(`${itemPath}.chemo.endDate`)}
                                {...form.getInputProps(`${itemPath}.chemo.endDate`)}
                                label="Lopetuspäivä"
                                placeholder="Lopetuspäivä"
                            />
                        </FormRow>
                        <ItemList
                            path={`${itemPath}.chemo.drugs`}
                            itemFactory={newChemo}
                            title="Sytostaatit"
                            addButtonText="Lisää sytostaatti"
                        >
                            {item.chemo.drugs.map((item, index) => (
                                <ChemoItem
                                    key={item.id}
                                    path={`${itemPath}.chemo.drugs`}
                                    index={index}
                                    item={item}
                                />
                            ))}
                        </ItemList>
                    </Box>
                )}
            </Fieldset>
        </ItemPage>
    )
}