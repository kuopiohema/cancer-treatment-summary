import { Group, NumberInput, Select, Text, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { observer } from "mobx-react";
import { Radiotherapy } from "../../store/entity/radiotherapy";
import { EntityComponentProps } from "./entityComponentProps";
import { use } from "react";
import { StoreContext } from "../../store/StoreContext";

const RadiotherapyComponent = observer(({ data }: EntityComponentProps<Radiotherapy>) => {
    const store = use(StoreContext)

    return (
        <>
            <Group>
                <DateInput
                    value={data.startDate}
                    onChange={value => data.setStartDate(value)}
                    label="Aloituspäivä"
                    placeholder="pp.kk.vvvv"
                />
                <DateInput
                    value={data.endDate}
                    onChange={value => data.setEndDate(value)}
                    label="Lopetuspäivä"
                    placeholder="pp.kk.vvvv"
                />
            </Group>
            <TextInput
                value={data.target}
                onChange={e => data.setTarget(e.target.value)}
                label="Kohteet"
                placeholder="Esim. 'Oikea lisämunuainen, maksa'"
            />
            <Select
                value={data.mode}
                onChange={value => data.setMode(value)}
                label="Hoitomuoto"
                data={store.data.radiotherapyModeOptions}
            />
            <Group>
                <NumberInput
                    value={data.fractions}
                    onChange={value => data.setFractions(value)}
                    label="Fraktiot"
                    allowDecimal={false}
                    w={100}
                    flex="none"
                />
                <NumberInput
                    value={data.singleDose}
                    onChange={value => data.setSingleDose(value)}
                    label="Kerta-annos"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={100}
                    flex="none"
                />
                <NumberInput
                    value={data.totalDose}
                    onChange={value => data.setTotalDose(value)}
                    label="Kokonaisannos"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={100}
                    flex="none"
                />
            </Group>
            <Textarea
                value={data.notes}
                onChange={e => data.setNotes(e.target.value)}
                label="Lisätiedot"
                placeholder="Keskeytys, haittavaikutukset yms."
            />
        </>
    )
})

export default RadiotherapyComponent