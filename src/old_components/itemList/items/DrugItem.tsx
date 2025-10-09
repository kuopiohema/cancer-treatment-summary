import {Group, NumberInput, Select, Textarea, TextInput} from '@mantine/core'
import {toComboboxData} from '../../../data/dataUtils.ts'
import {drugDosingTypeOptions} from '../../../data/drugDosingTypeOptions.ts'
import type {ItemProps} from '../../../types/itemProps.ts'
import getListItemPath from '../../../utils/getListItemPath.ts'
import ItemListItem from '../ItemListItem.tsx'
import type { Drug } from '../../../types/form/drug.ts'
import { useFormContext } from '../../../form/formContext.ts'

export default function DrugItem({path, index, item}: ItemProps<Drug>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const drugDosingOptionsData = toComboboxData(drugDosingTypeOptions)

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