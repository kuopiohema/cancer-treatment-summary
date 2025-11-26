import { Autocomplete, Fieldset, Group, NumberInput, Select, Switch, Text, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useQuery } from '@tanstack/react-query'
import { observer } from 'mobx-react-lite'
import { sexOptions } from '../../../data/sex.ts'
import { CellTherapy } from '../../../store/entities/cellTherapy'
import { Drug } from '../../../store/entities/drug'
import { fetchSelectOptions } from '../../../utils/fetchJson'
import { withUnknown } from '../../../utils/withUnknown'
import ChildList from '../../entityLists/ChildList'
import DrugListItem from '../listItems/DrugListItem'
import { EntityPageProps } from './entityPageProps'

const CellTherapyPage = observer(({ entity }: EntityPageProps<CellTherapy>) => {
    const cellTherapyTypeOptions = useQuery({
        queryKey: ['cellTherapyType'],
        queryFn: fetchSelectOptions
    })

    const cellOriginOptions = useQuery({
        queryKey: ['cellOrigin'],
        queryFn: fetchSelectOptions
    })

    const carTargetOptions = useQuery({
        queryKey: ['carTarget'],
        queryFn: fetchSelectOptions
    })

    const cellDonorOptions = useQuery({
        queryKey: ['cellDonor'],
        queryFn: fetchSelectOptions
    })

    const hlaMatchOptions = useQuery({
        queryKey: ['hlaMatch'],
        queryFn: fetchSelectOptions,
        select: data => withUnknown(data)
    })

    const bloodGroupOptions = useQuery({
        queryKey: ['bloodGroup'],
        queryFn: fetchSelectOptions,
        select: data => withUnknown(data)
    })

    return (
        <>
            <Fieldset legend="Hoidon perustiedot">
                <Autocomplete
                    value={entity.type}
                    onChange={value => entity.set('type', value)}
                    label="Hoitomuoto"
                    data={cellTherapyTypeOptions.data}
                />
                <Select
                    value={entity.origin}
                    onChange={value => entity.set('origin', value)}
                    label="Solujen alkuperä"
                    data={cellOriginOptions.data}
                    flex="none"
                />
                <Autocomplete
                    value={entity.carTarget}
                    onChange={value => entity.set('carTarget', value)}
                    label="CAR-solujen kohde"
                    data={carTargetOptions.data}
                />
                <DateInput
                    value={entity.date}
                    onChange={value => entity.set('date', value)}
                    label="Siirtopäivä"
                />
                <TextInput
                    value={entity.conditioning}
                    onChange={e => entity.set('conditioning', e.target.value)}
                    label="Esihoito"
                    placeholder="Esim. 'Busulfaani-syklofosfamidi-melfalaani'"
                />
            </Fieldset>
            <Fieldset legend="Luovuttajan tiedot (allogeeninen kantasolusiirto)">
                <Select
                    value={entity.donor}
                    onChange={value => entity.set('donor', value)}
                    label="Luovuttaja"
                    data={cellDonorOptions.data}
                />
                <Select
                    value={entity.donorSex}
                    onChange={value => entity.set('donorSex', value)}
                    label="Sukupuoli"
                    data={sexOptions}
                />
                <Select
                    value={entity.hlaMatch}
                    onChange={value => entity.set('hlaMatch', value)}
                    label="HLA-sopivuus"
                    data={hlaMatchOptions.data}
                />
                <Select
                    value={entity.donorBloodGroup}
                    onChange={value => entity.set('donorBloodGroup', value)}
                    label="Veriryhmä"
                    data={bloodGroupOptions.data}
                />
            </Fieldset>
            <ChildList
                entityList={entity.drugs}
                entityFactory={() => new Drug({})}
                title="Esihoidon lääkkeet"
                emptyText="Ei lääkkeitä"
                addButtonText="Lisää lääke"
                // @ts-expect-error This should work but doesn't for some reason. See ChemotherapyPage.tsx.
                ListItemComponent={DrugListItem}
            />
            <Fieldset legend="Koko kehon sädehoito (TBI)">
                <Switch
                    checked={entity.tbi}
                    onChange={e => entity.set('tbi', e.target.checked)}
                    label="Annettu"
                />
                <NumberInput
                    value={entity.tbiDoseBody}
                    onChange={value => entity.set('tbiDoseBody', value)}
                    label="Annos (vartalo)"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={200}
                    flex="none"
                    disabled={!entity.tbi}
                />
                <NumberInput
                    value={entity.tbiDoseLungs}
                    onChange={value => entity.set('tbiDoseLungs', value)}
                    label="Annos (keuhkot)"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={200}
                    flex="none"
                    disabled={!entity.tbi}
                />
            </Fieldset>
            <Fieldset legend="Luovuttajan lymfosyytti-infuusiohoito (DLI)">
                <Switch
                    checked={entity.dli}
                    onChange={e => entity.set('dli', e.target.checked)}
                    label="Annettu"
                />
                <Group>
                    <DateInput
                        value={entity.dliStartDate}
                        onChange={value => entity.set('dliStartDate', value)}
                        label="Aloituspäivä"
                        disabled={!entity.dli}
                    />
                    <DateInput
                        value={entity.dliEndDate}
                        onChange={value => entity.set('dliEndDate', value)}
                        label="Lopetuspäivä"
                        disabled={!entity.dli}
                    />
                    <NumberInput
                        value={entity.dliDoses}
                        onChange={value => entity.set('dliDoses', value)}
                        label="Annokset"
                        allowDecimal={false}
                        w={100}
                        flex="none"
                        disabled={!entity.dli}
                    />
                </Group>
            </Fieldset>
        </>
    )
})

export default CellTherapyPage