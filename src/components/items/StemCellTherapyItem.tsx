import {Group, NumberInput, Select, Text, TextInput} from '@mantine/core'
import {DateInput} from '@mantine/dates'
import {useState} from 'react'
import {bloodGroupOptions} from '../../data/bloodGroupOptions.ts'
import {toComboboxData} from '../../data/dataUtils.ts'
import {donorOptions, type DonorValue} from '../../data/donorOptions.ts'
import {hlaMatchOptions} from '../../data/hlaMatchOptions.ts'
import {sexOptions} from '../../data/sexOptions.ts'
import {newDrug} from '../../form/drug.ts'
import {useFormContext} from '../../form/formContext.ts'
import type {StemCellTherapy} from '../../form/stemCellTherapy.ts'
import type {ItemProps} from '../../types/itemProps.ts'
import getListItemPath from '../../utils/getListItemPath.ts'
import ItemList from '../ItemList.tsx'
import ItemListItem from '../ItemListItem.tsx'
import DrugItem from './DrugItem.tsx'

export default function StemCellTherapyItem({path, index, item}: ItemProps<StemCellTherapy>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const donorOptionsData = toComboboxData(donorOptions)
    const sexOptionsData = toComboboxData(sexOptions)
    const hlaMatchOptionsData = toComboboxData(hlaMatchOptions)
    const bloodGroupOptionsData = toComboboxData(bloodGroupOptions)

    const [donor, setDonor] = useState(item.donor)
    form.watch(`${itemPath}.donor`, ({value}: {value: DonorValue}) => setDonor(value))

    return (
        <ItemListItem
            path={path}
            index={index}
            draggableId={item.id}
            itemName="soluterapia"
        >
            <DateInput
                key={form.key(`${itemPath}.date`)}
                {...form.getInputProps(`${itemPath}.date`)}
                label="Päivämäärä"
                placeholder="Päivämäärä"
            />
            <Group grow preventGrowOverflow={false}>
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
                    disabled={donor === 'self'}
                />
                <Select
                    key={form.key(`${itemPath}.hlaMatch`)}
                    {...form.getInputProps(`${itemPath}.hlaMatch`)}
                    label="HLA-sopivuus"
                    data={hlaMatchOptionsData}
                    w={200}
                    flex="none"
                    disabled={donor === 'self'}
                />
                <Select
                    key={form.key(`${itemPath}.bloodGroup`)}
                    {...form.getInputProps(`${itemPath}.bloodGroup`)}
                    label="Veriryhmä"
                    data={bloodGroupOptionsData}
                    w={150}
                    flex="none"
                    disabled={donor === 'self'}
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
                    disabled={donor === 'self'}
                />
                <NumberInput
                    key={form.key(`${itemPath}.tbiDoseLungs`)}
                    {...form.getInputProps(`${itemPath}.tbiDoseLungs`)}
                    label="TBI-annos (keuhkot)"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={200}
                    flex="none"
                    disabled={donor === 'self'}
                />
            </Group>
            <ItemList
                path={`${itemPath}.drugs`}
                itemFactory={newDrug}
                title="Esihoidon sytostaatit"
                addButtonText="Lisää sytostaatti"
            >
                {item.drugs.length === 0 && <Text>Ei sytostaatteja</Text>}
                {item.drugs.map((drug, drugIndex) => (
                    <DrugItem
                        key={drug.id}
                        path={`${itemPath}.drugs`}
                        index={drugIndex}
                        item={drug}
                    />
                ))}
            </ItemList>
        </ItemListItem>
    )
}