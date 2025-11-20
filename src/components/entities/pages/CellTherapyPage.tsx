import { observer } from "mobx-react-lite"
import { CellTherapy } from "../../../store/entity/cellTherapy"
import { EntityPageProps } from "./entityPageProps"
import { DateInput } from "@mantine/dates"
import { Autocomplete, Fieldset, Group, NumberInput, Select, Switch, Text, TextInput } from "@mantine/core"
import ChildList from "../../entityLists/ChildList"
import { Drug } from "../../../store/entity/drug"
import DrugListItem from "../listItems/DrugListItem"
import { sexOptions } from "../../../options/sex"
import { useQuery } from "@tanstack/react-query"
import { fetchSelectOptions } from "../../../utils/fetchJson"
import { withUnknown } from "../../../utils/withUnknown"

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
                    onChange={value => { entity.type = value }}
                    label="Hoitomuoto"
                    data={cellTherapyTypeOptions.data}
                />
                <Select
                    value={entity.origin}
                    onChange={value => { entity.origin = value }}
                    label="Solujen alkuperä"
                    data={cellOriginOptions.data}
                    flex="none"
                />
                <Autocomplete
                    value={entity.carTarget}
                    onChange={value => { entity.carTarget = value }}
                    label="CAR-solujen kohde"
                    data={carTargetOptions.data}
                />
                <DateInput
                    value={entity.date}
                    onChange={value => { entity.date = value }}
                    label="Siirtopäivä"
                />
                <TextInput
                    value={entity.conditioning}
                    onChange={e => { entity.conditioning = e.target.value }}
                    label="Esihoito"
                    placeholder="Esim. 'Busulfaani-syklofosfamidi-melfalaani'"
                />
            </Fieldset>
            <Fieldset legend="Luovuttajan tiedot (allogeeninen kantasolusiirto)">
                <Select
                    value={entity.donor}
                    onChange={value => { entity.donor = value }}
                    label="Luovuttaja"
                    data={cellDonorOptions.data}
                />
                <Select
                    value={entity.donorSex}
                    onChange={value => { entity.donorSex = value }}
                    label="Sukupuoli"
                    data={sexOptions}
                />
                <Select
                    value={entity.hlaMatch}
                    onChange={value => { entity.hlaMatch = value }}
                    label="HLA-sopivuus"
                    data={hlaMatchOptions.data}
                />
                <Select
                    value={entity.donorBloodGroup}
                    onChange={value => { entity.donorBloodGroup = value }}
                    label="Veriryhmä"
                    data={bloodGroupOptions.data}
                />
            </Fieldset>
            <ChildList
                entityList={entity.drugs}
                entityFactory={() => new Drug()}
                title="Esihoidon lääkkeet"
                emptyText="Ei lääkkeitä"
                addButtonText="Lisää lääke"
                ListItemComponent={DrugListItem}
            />
            <Fieldset legend="Koko kehon sädehoito (TBI)">
                <Switch
                    checked={entity.tbi}
                    onChange={e => { entity.tbi = e.target.checked }}
                    label="Annettu"
                />
                <NumberInput
                    value={entity.tbiDoseBody}
                    onChange={value => { entity.tbiDoseBody = value }}
                    label="Annos (vartalo)"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={200}
                    flex="none"
                    disabled={!entity.tbi}
                />
                <NumberInput
                    value={entity.tbiDoseLungs}
                    onChange={value => { entity.tbiDoseLungs = value }}
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
                    onChange={e => { entity.dli = e.target.checked }}
                    label="Annettu"
                />
                <Group>
                    <DateInput
                        value={entity.dliStartDate}
                        onChange={value => { entity.dliStartDate = value }}
                        label="Aloituspäivä"
                        disabled={!entity.dli}
                    />
                    <DateInput
                        value={entity.dliEndDate}
                        onChange={value => { entity.dliEndDate = value }}
                        label="Lopetuspäivä"
                        disabled={!entity.dli}
                    />
                    <NumberInput
                        value={entity.dliDoses}
                        onChange={value => { entity.dliDoses = value }}
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