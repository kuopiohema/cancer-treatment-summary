import ItemListItem from '../ItemListItem.tsx'
import {type Chemo, useFormContext} from '../../formContext.ts'
import type {ItemProps} from '../../types/itemProps.ts'
import getListItemPath from '../../utils/getListItemPath.ts'
import {NumberInput, Select, Textarea, TextInput} from '@mantine/core'
import FormRow from '../FormRow.tsx'
import { toComboboxData } from '../../data/dataUtils.ts'
import { drugDosingOptions } from '../../data/drugDosingOptions.ts'

export default function ChemoItem({path, index, item}: ItemProps<Chemo>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const drugDosingOptionsData = toComboboxData(drugDosingOptions)

    return (
        <ItemListItem
            path={path}
            index={index}
            draggableId={item.id}
            itemName="sytostaatti"
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
                    key={form.key(`${itemPath}.dosingType`)}
                    {...form.getInputProps(`${itemPath}.dosingType`)}
                    label="Annoskaava"
                    data={drugDosingOptionsData}
                    w={100}
                    flex="none"
                />
                <Textarea
                    key={form.key(`${itemPath}.notes`)}
                    {...form.getInputProps(`${itemPath}.notes`)}
                    label="Lisätiedot"
                    placeholder="Keskeytys, haittavaikutus jne."
                    minRows={1}
                    autosize
                />
            </FormRow>
        </ItemListItem>
    )
}