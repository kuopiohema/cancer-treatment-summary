import ItemCard from '../ItemCard.tsx'
import {type Chemo, useFormContext} from '../../formContext.ts'
import type {ItemProps} from '../../types/itemProps.ts'
import getListItemPath from '../../utils/getListItemPath.ts'
import {ComboboxData, NumberInput, Select, TextInput} from '@mantine/core'
import FormRow from '../FormRow.tsx'

const doseOptions: ComboboxData = [
    {value: 'mgm2', label: 'mg/m2'},
    {value: 'mgkg', label: 'mg/kg'},
    {value: 'mg', label: 'mg'},
    {value: 'um2', label: 'U/m2'},
    {value: 'ukg', label: 'U/kg'},
    {value: 'u', label: 'U'},
    {value: 'ugm2', label: 'µg/m2'},
    {value: 'ugkg', label: 'µg/kg'},
    {value: 'ug', label: 'µg'}
]

export default function ChemoItem({path, index, item}: ItemProps<Chemo>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    return (
        <ItemCard
            path={path}
            index={index}
            draggableId={item.id}
        >
            <FormRow>
                <TextInput
                    key={form.key(`${itemPath}.drug`)}
                    {...form.getInputProps(`${itemPath}.drug`)}
                    label="Lääke"
                    placeholder="Lääke"
                />
                <NumberInput
                    key={form.key(`${itemPath}.dose`)}
                    {...form.getInputProps(`${itemPath}.dose`)}
                    label="Annos"
                    allowNegative={false}
                    w={100}
                    flex="none"
                />
                <Select
                    key={form.key(`${itemPath}.doseType`)}
                    {...form.getInputProps(`${itemPath}.doseType`)}
                    label="Annoskaava"
                    data={doseOptions}
                    w={100}
                    flex="none"
                />
            </FormRow>
        </ItemCard>
    )
}