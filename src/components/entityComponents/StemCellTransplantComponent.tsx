import { observer } from "mobx-react";
import { StemCellTransplant } from "../../store/entity/stemCellTransplant";
import { EntityComponentProps } from "./entityComponentProps";
import { DateInput } from "@mantine/dates";
import { Fieldset, Group, NumberInput, Select, Switch, Text, TextInput } from "@mantine/core";
import ChildList from "../entityLists/ChildList";
import { Drug } from "../../store/entity/drug";
import DrugComponent from "./DrugComponent";
import { toComboboxData } from "../../utils/selectOptionListUtils";
import { use } from "react";
import { StoreContext } from "../../store/StoreContext";

const StemCellTransplantComponent = observer(({ data }: EntityComponentProps<StemCellTransplant>) => {
    const store = use(StoreContext)

    const stemCellTypeOptionsData = toComboboxData(store.data.stemCellTypeOptions)
    const stemCellDonorOptionsData = toComboboxData(store.data.stemCellDonorOptions, true)
    const sexOptionsData = toComboboxData(store.data.sexOptions, true)
    const hlaMatchOptionsData = toComboboxData(store.data.hlaMatchOptions, true)
    const bloodGroupOptionsData = toComboboxData(store.data.bloodGroupOptions, true)

    const donorDataDisabled = data.type === '' || data.type === 'auto'

    return (
        <>
            <Group grow preventGrowOverflow={false}>
                <Select
                    value={data.type}
                    onChange={value => data.setType(value ?? '')}
                    label="Siirteen alkuperä"
                    data={stemCellTypeOptionsData}
                    flex="none"
                />
                <DateInput
                    value={data.date}
                    onChange={value => data.setDate(value)}
                    label="Siirtopäivä"
                    placeholder="Siirtopäivä"
                />
                <TextInput
                    value={data.conditioning}
                    onChange={e => data.setConditioning(e.target.value)}
                    label="Esihoito"
                    placeholder="Esim. 'Busulfaani-syklofosfamidi-melfalaani'"
                />
            </Group>
            <Fieldset
                legend="Luovuttajan tiedot"
                disabled={donorDataDisabled}
            >
                <Select
                    value={data.donor}
                    onChange={value => data.setDonor(value ?? '')}
                    label="Luovuttaja"
                    data={stemCellDonorOptionsData}
                />
                <Select
                    value={data.donorSex}
                    onChange={value => data.setDonorSex(value ?? '')}
                    label="Sukupuoli"
                    data={sexOptionsData}
                />
                <Select
                    value={data.hlaMatch}
                    onChange={value => data.setHlaMatch(value ?? '')}
                    label="HLA-sopivuus"
                    data={hlaMatchOptionsData}
                />
                <Select
                    value={data.donorBloodGroup}
                    onChange={value => data.setDonorBloodGroup(value ?? '')}
                    label="Veriryhmä"
                    data={bloodGroupOptionsData}
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

export default StemCellTransplantComponent