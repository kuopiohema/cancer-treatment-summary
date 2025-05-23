import {Group, NumberInput, Select, Textarea, TextInput} from '@mantine/core'
import {toComboboxData} from '../../data/dataUtils.ts'
import {drugDosingOptions} from '../../data/drugDosingOptions.ts'
import {type Drug, useFormContext} from '../../formContext.ts'
import type {ItemProps} from '../../types/itemProps.ts'
import getListItemPath from '../../utils/getListItemPath.ts'
import ItemListItem from '../ItemListItem.tsx'

export default function ChemoItem({path, index, item}: ItemProps<Drug>) {
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
            <Group grow preventGrowOverflow={false} align="flex-start">
                <TextInput
                    key={form.key(`${itemPath}.drug`)}
                    {...form.getInputProps(`${itemPath}.drug`)}
                    label="Lääke"
                    placeholder="Lääke"
                    w={220}
                    flex="none"
                />
                <NumberInput
                    key={form.key(`${itemPath}.dose`)}
                    {...form.getInputProps(`${itemPath}.dose`)}
                    label="Annos"
                    w={80}
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
                />

            </Group>
        </ItemListItem>
    )
}