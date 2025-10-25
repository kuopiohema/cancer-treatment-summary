import { observer } from "mobx-react";
import { CellTherapy } from "../../store/entity/cellTherapy";
import { EntityComponentProps } from "./entityComponentProps";
import { DateInput } from "@mantine/dates";
import { Autocomplete, Fieldset, NumberInput, Select, Switch, Text, TextInput } from "@mantine/core";
import ChildList from "../entityLists/ChildList";
import { Drug } from "../../store/entity/drug";
import DrugComponent from "./DrugComponent";
import { use } from "react";
import { StoreContext } from "../../store/StoreContext";
import { sexOptions } from "../../options/sex";

const CellTherapyComponent = observer(({ data }: EntityComponentProps<CellTherapy>) => {
    const store = use(StoreContext)

    return (
        <>
            <Fieldset legend="Hoidon perustiedot">
                <Select
                    value={data.origin}
                    onChange={value => data.setOrigin(value)}
                    label="Solujen alkuperä"
                    data={store.data.cellOriginOptions}
                    flex="none"
                />
                <Autocomplete
                    value={data.type}
                    onChange={value => data.setType(value)}
                    label="Solujen tyyppi"
                    data={store.data.cellTypeOptions}
                />
                <Autocomplete
                    value={data.carTarget}
                    onChange={value => data.setCarTarget(value)}
                    label="CAR-solujen kohde"
                    data={store.data.carTargetOptions}
                />
                <DateInput
                    value={data.date}
                    onChange={value => data.setDate(value)}
                    label="Siirtopäivä"
                />
                <TextInput
                    value={data.conditioning}
                    onChange={e => data.setConditioning(e.target.value)}
                    label="Esihoito"
                    placeholder="Esim. 'Busulfaani-syklofosfamidi-melfalaani'"
                />
            </Fieldset>
            <Fieldset legend="Luovuttajan tiedot (allogeeninen kantasolusiirto)">
                <Select
                    value={data.donor}
                    onChange={value => data.setDonor(value)}
                    label="Luovuttaja"
                    data={store.data.cellDonorOptions}
                />
                <Select
                    value={data.donorSex}
                    onChange={value => data.setDonorSex(value)}
                    label="Sukupuoli"
                    data={sexOptions}
                />
                <Select
                    value={data.hlaMatch}
                    onChange={value => data.setHlaMatch(value)}
                    label="HLA-sopivuus"
                    data={store.data.hlaMatchOptions}
                />
                <Select
                    value={data.donorBloodGroup}
                    onChange={value => data.setDonorBloodGroup(value)}
                    label="Veriryhmä"
                    data={store.data.bloodGroupOptions}
                />
            </Fieldset>

            <ChildList
                entityList={data.drugs}
                entityFactory={() => new Drug({})}
                title="Esihoidon lääkkeet"
                emptyText="Ei lääkkeitä"
                addButtonText="Lisää lääke"
                ListItemComponent={DrugComponent}
            />
            <Fieldset legend="Koko kehon sädehoito (TBI)">
                <Switch
                    checked={data.tbi}
                    onChange={e => data.setTbi(e.target.checked)}
                    label="Annettu"
                />
                <NumberInput
                    value={data.tbiDoseBody}
                    onChange={value => data.setTbiDoseBody(value)}
                    label="Annos (vartalo)"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={200}
                    flex="none"
                    disabled={!data.tbi}
                />
                <NumberInput
                    value={data.tbiDoseLungs}
                    onChange={value => data.setTbiDoseLungs(value)}
                    label="Annos (keuhkot)"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={200}
                    flex="none"
                    disabled={!data.tbi}
                />
            </Fieldset>
        </>
    )
})

export default CellTherapyComponent