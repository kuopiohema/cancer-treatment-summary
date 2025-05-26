import { Stack, Group } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import type { Chemotherapy } from '../../../form/chemotherapy'
import { newDrug } from '../../../form/drug'
import { useFormContext } from '../../../form/formContext'
import type { ItemProps } from '../../../types/itemProps'
import getListItemPath from '../../../utils/getListItemPath'
import ItemList from '../ItemList'
import DrugItem from './DrugItem'

export default function ChemoItem({path, index, item}: ItemProps<Chemotherapy>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    return (
        <Stack gap="sm">
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
            <ItemList
                items={item.drugs}
                path={`${itemPath}.drugs`}
                ItemComponent={DrugItem}
                itemFactory={newDrug}
                title="Sytostaatit"
                emptyText="Ei sytostaatteja"
                addButtonText="Lisää sytostaatti"
            />
        </Stack>
    )
}