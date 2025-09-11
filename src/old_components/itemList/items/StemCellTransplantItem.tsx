import { Group, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useState } from 'react'
import { bloodGroupOptions } from '../../../data/bloodGroupOptions.ts'
import { toComboboxData } from '../../../data/dataUtils.ts'
import { donorOptions } from '../../../data/donorOptions.ts'
import { hlaMatchOptions } from '../../../data/hlaMatchOptions.ts'
import { sctTypeOptions, type SctTypeValue } from '../../../data/sctTypeOptions.ts'
import { sexOptions } from '../../../data/sexOptions.ts'
import { newDrug } from '../../../types/form/drug.ts'
import { useFormContext } from '../../../form/formContext.ts'
import type { StemCellTransplant } from '../../../types/form/stemCellTransplant.ts'
import type { FormValue } from '../../../types/formValue.ts'
import type { ItemProps } from '../../../types/itemProps.ts'
import getListItemPath from '../../../utils/getListItemPath.ts'
import ItemList from '../ItemList.tsx'
import DrugItem from './DrugItem.tsx'

export default function StemCellTransplantItem({path, index, item}: ItemProps<StemCellTransplant>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const sctTypeOptionsData = toComboboxData(sctTypeOptions)
    const donorOptionsData = toComboboxData(donorOptions)
    const sexOptionsData = toComboboxData(sexOptions)
    const hlaMatchOptionsData = toComboboxData(hlaMatchOptions)
    const bloodGroupOptionsData = toComboboxData(bloodGroupOptions)

    const [type, setType] = useState(item.type)
    form.watch(`${itemPath}.type`, ({value}: FormValue<SctTypeValue>) => setType(value))

    return (
        <Stack gap="sm">
            <DateInput
                key={form.key(`${itemPath}.date`)}
                {...form.getInputProps(`${itemPath}.date`)}
                label="Päivämäärä"
                placeholder="Päivämäärä"
            />
            <Group grow preventGrowOverflow={false}>
                <Select
                    key={form.key(`${itemPath}.type`)}
                    {...form.getInputProps(`${itemPath}.type`)}
                    label="Siirron tyyppi"
                    data={sctTypeOptionsData}
                    w={150}
                    flex="none"
                />
                <Select
                    key={form.key(`${itemPath}.donor`)}
                    {...form.getInputProps(`${itemPath}.donor`)}
                    label="Luovuttaja"
                    data={donorOptionsData}
                />
                <Select
                    key={form.key(`${itemPath}.donorSex`)}
                    {...form.getInputProps(`${itemPath}.donorSex`)}
                    label="Sukupuoli"
                    data={sexOptionsData}
                    w={150}
                    flex="none"
                    disabled={type === 'auto'}
                />
                <Select
                    key={form.key(`${itemPath}.hlaMatch`)}
                    {...form.getInputProps(`${itemPath}.hlaMatch`)}
                    label="HLA-sopivuus"
                    data={hlaMatchOptionsData}
                    w={200}
                    flex="none"
                    disabled={type === 'auto'}
                />
                <Select
                    key={form.key(`${itemPath}.bloodGroup`)}
                    {...form.getInputProps(`${itemPath}.bloodGroup`)}
                    label="Veriryhmä"
                    data={bloodGroupOptionsData}
                    w={150}
                    flex="none"
                    disabled={type === 'auto'}
                />
            </Group>
            <TextInput
                key={form.key(`${itemPath}.conditioning`)}
                {...form.getInputProps(`${itemPath}.conditioning`)}
                label="Esihoito"
                placeholder="Esim. 'Busulfaani-syklofosfamidi-melfalaani'"
            />
            <Group>
                <NumberInput
                    key={form.key(`${itemPath}.tbiDoseBody`)}
                    {...form.getInputProps(`${itemPath}.tbiDoseBody`)}
                    label="TBI-annos (vartalo)"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={200}
                    flex="none"
                    disabled={type === 'auto'}
                />
                <NumberInput
                    key={form.key(`${itemPath}.tbiDoseLungs`)}
                    {...form.getInputProps(`${itemPath}.tbiDoseLungs`)}
                    label="TBI-annos (keuhkot)"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={200}
                    flex="none"
                    disabled={type === 'auto'}
                />
            </Group>
            <ItemList
                items={item.drugs}
                path={`${itemPath}.drugs`}
                ItemComponent={DrugItem}
                itemFactory={newDrug}
                title="Esihoidon sytostaatit"
                emptyText="Ei sytostaatteja"
                addButtonText="Lisää sytostaatti"
            />
        </Stack>
    )
}