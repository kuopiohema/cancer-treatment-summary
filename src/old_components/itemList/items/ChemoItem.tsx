import { Stack, Group } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import type { Chemotherapy } from '../../../types/form/chemotherapy'
import { Drug, newDrug } from '../../../types/form/drug'
import { useFormContext } from '../../../form/formContext'
import type { ItemProps } from '../../../types/itemProps'
import getListItemPath from '../../../utils/getListItemPath'
import ItemList from '../ItemList'
import DrugItem from './DrugItem'
import getDoxoEquivalent from '../../../utils/getDoxoEquivalent'
import { useState } from 'react'
import { FormValue } from '../../../types/formValue'

export default function ChemoItem({path, index, item}: ItemProps<Chemotherapy>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    /*const [doxoEquivalent, setDoxoEquivalent] = useState(getDoxoEquivalent(item.drugs))
    form.watch(`${itemPath}.drugs`, ({value}: FormValue<Drug[]>) => setDoxoEquivalent(getDoxoEquivalent(value)))*/
    const [doxoEquivalent, setDoxoEquivalent] = useState(getDoxoEquivalent(item.drugs))
    form.watch(`${itemPath}.drugs`, ({value}: {value: Drug[]}) => setDoxoEquivalent(getDoxoEquivalent(value)))
    //form.watch(`${itemPath}.drugs`, ({value}: FormValue<Drug[]>) => setDoxoEquivalent(getDoxoEquivalent(value)))

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
            DE: {doxoEquivalent}
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