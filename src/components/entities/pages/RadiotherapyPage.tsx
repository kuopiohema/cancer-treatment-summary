import { Autocomplete, Group, NumberInput, Text, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { observer } from "mobx-react-lite";
import { use } from "react";
import { Radiotherapy } from "../../../store/entity/radiotherapy";
import { StoreContext } from "../../../store/StoreContext";
import { EntityPageProps } from "./entityPageProps";

const RadiotherapyPage = observer(({ entity }: EntityPageProps<Radiotherapy>) => {
    const store = use(StoreContext)

    return (
        <>
            <Group>
                <DateInput
                    value={entity.startDate}
                    onChange={value => { entity.startDate = value }}
                    label="Aloituspäivä"
                />
                <DateInput
                    value={entity.endDate}
                    onChange={value => { entity.endDate = value }}
                    label="Lopetuspäivä"
                />
            </Group>
            <TextInput
                value={entity.target}
                onChange={e => { entity.target = e.target.value }}
                label="Kohteet"
                placeholder="Esim. 'Oikea lisämunuainen, maksa'"
            />
            <Autocomplete
                value={entity.mode}
                onChange={value => { entity.mode = value }}
                label="Hoitomuoto"
                data={store.data.radiotherapyModeOptions}
            />
            <Group>
                <NumberInput
                    value={entity.fractions}
                    onChange={value => { entity.fractions = value }}
                    label="Fraktiot"
                    allowDecimal={false}
                    w={100}
                    flex="none"
                />
                <NumberInput
                    value={entity.singleDose}
                    onChange={value => { entity.singleDose = value }}
                    label="Kerta-annos"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={100}
                    flex="none"
                />
                <NumberInput
                    value={entity.totalDose}
                    onChange={value => { entity.totalDose = value }}
                    label="Kokonaisannos"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={100}
                    flex="none"
                />
            </Group>
            <Textarea
                value={entity.notes}
                onChange={e => { entity.notes = e.target.value }}
                label="Lisätiedot"
                placeholder="Keskeytys, haittavaikutukset yms."
            />
        </>
    )
})

export default RadiotherapyPage