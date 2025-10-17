import { observer } from "mobx-react";
import { StemCellTransplant } from "../../store/entity/stemCellTransplant";
import { EntityComponentProps } from "./entityComponentProps";
import { toComboboxData } from "../../data/dataUtils";
import { sctOriginOptions, SctOriginValue } from "../../data/sctOriginOptions";
import { donorOptions, DonorValue } from "../../data/donorOptions";
import { sexOptions, SexValue } from "../../data/sexOptions";
import { hlaMatchOptions, HlaMatchValue } from "../../data/hlaMatchOptions";
import { bloodGroupOptions, BloodGroupValue } from "../../data/bloodGroupOptions";
import { DateInput } from "@mantine/dates";
import { Fieldset, Group, NumberInput, Select, Switch, Text, TextInput } from "@mantine/core";
import ChildList from "../entityLists/ChildList";
import { Drug } from "../../store/entity/drug";
import DrugComponent from "./DrugComponent";

const StemCellTransplantComponent = observer(({ data }: EntityComponentProps<StemCellTransplant>) => {
    const sctOriginOptionsData = toComboboxData(sctOriginOptions)
    const donorOptionsData = toComboboxData(donorOptions)
    const sexOptionsData = toComboboxData(sexOptions)
    const hlaMatchOptionsData = toComboboxData(hlaMatchOptions)
    const bloodGroupOptionsData = toComboboxData(bloodGroupOptions)

    const donorDataDisabled = data.type === '' || data.type === 'auto'

    return (
        <>
            <Group grow preventGrowOverflow={false}>
                <Select
                    value={data.type}
                    onChange={value => value && data.setType(value as SctOriginValue)}
                    label="Siirteen alkuperä"
                    data={sctOriginOptionsData}
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
                    onChange={value => value && data.setDonor(value as DonorValue)}
                    label="Luovuttaja"
                    data={donorOptionsData}
                />
                <Select
                    value={data.donorSex}
                    onChange={value => value && data.setDonorSex(value as SexValue)}
                    label="Sukupuoli"
                    data={sexOptionsData}
                />
                <Select
                    value={data.hlaMatch}
                    onChange={value => value && data.setHlaMatch(value as HlaMatchValue)}
                    label="HLA-sopivuus"
                    data={hlaMatchOptionsData}
                />
                <Select
                    value={data.donorBloodGroup}
                    onChange={value => value && data.setDonorBloodGroup(value as BloodGroupValue)}
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