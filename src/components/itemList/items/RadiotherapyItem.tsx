import {Group, NumberInput, Select, Stack, Text, Textarea, TextInput} from '@mantine/core'
import {DateInput} from '@mantine/dates'
import {useState} from 'react'
import {toComboboxData} from '../../../data/dataUtils'
import {radioModeOptions, type RadioModeValue} from '../../../data/radioModeOptions'
import type {ItemProps} from '../../../types/itemProps'
import getListItemPath from '../../../utils/getListItemPath'
import type { Radiotherapy } from '../../../form/radiotherapy'
import { useFormContext } from '../../../form/formContext'

export default function RadiotherapyItem({path, index, item}: ItemProps<Radiotherapy>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const radioModeOptionsData = toComboboxData(radioModeOptions)

    const [radioMode, setRadioMode] = useState(item.mode)
    form.watch(`${itemPath}.mode`, ({value}: { value: RadioModeValue }) => setRadioMode(value))

    return (
        <Stack gap="sm" w="600px">
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
            <TextInput
                key={form.key(`${itemPath}.target`)}
                {...form.getInputProps(`${itemPath}.target`)}
                label="Kohde/kohteet"
                placeholder="Kohde/kohteet"
            />
            <Group grow preventGrowOverflow={false}>
                <Select
                    key={form.key(`${itemPath}.mode`)}
                    {...form.getInputProps(`${itemPath}.mode`)}
                    label="Hoitomuoto"
                    data={radioModeOptionsData}
                    w={250}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${itemPath}.modeOther`)}
                    {...form.getInputProps(`${itemPath}.modeOther`)}
                    label=" "
                    placeholder="Muu, mikä?"
                    disabled={radioMode !== 'other'}
                />
            </Group>
            <Group>
                <NumberInput
                    key={form.key(`${itemPath}.singleDose`)}
                    {...form.getInputProps(`${itemPath}.singleDose`)}
                    label="Kerta-annos"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={100}
                    flex="none"
                />
                <NumberInput
                    key={form.key(`${itemPath}.fractions`)}
                    {...form.getInputProps(`${itemPath}.fractions`)}
                    label="Fraktiot"
                    allowDecimal={false}
                    w={100}
                    flex="none"
                />
                <NumberInput
                    key={form.key(`${itemPath}.totalDose`)}
                    {...form.getInputProps(`${itemPath}.totalDose`)}
                    label="Kokonaisannos"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={100}
                    flex="none"
                />
            </Group>
            <Textarea
                key={form.key(`${itemPath}.notes`)}
                {...form.getInputProps(`${itemPath}.notes`)}
                label="Lisätiedot"
                placeholder="Keskeytys, haittavaikutus jne."
            />
        </Stack>
    )
}