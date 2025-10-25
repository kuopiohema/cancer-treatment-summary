import { observer } from "mobx-react";
import { Procedure } from "../../store/entity/procedure";
import { EntityComponentProps } from "./entityComponentProps";
import { Group, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const ProcedureComponent = observer(({ data }: EntityComponentProps<Procedure>) => {
    return (
        <>
            <Group grow preventGrowOverflow={false}>
                <DateInput
                    value={data.date}
                    onChange={value => data.setDate(value)}
                    label="Päivämäärä"
                    placeholder="pp.kk.vvvv"
                />
                <TextInput
                    value={data.procedure}
                    onChange={e => data.setProcedure(e.target.value)}
                    label="Toimenpide"
                    placeholder="Esim. 'Nefrektomia'"
                />
            </Group>
            <Textarea
                value={data.details}
                onChange={e => data.setDetails(e.target.value)}
                label="Tarkempi kuvaus"
                placeholder="Esim. 'Oikean munuaisen poisto kasvaimen mukana. Samalla poistettu vatsaontelon imusolmukkeita.'"
                minRows={2}
            />
            <Textarea
                value={data.complications}
                onChange={e => data.setComplications(e.target.value)}
                label="Komplikaatiot"
                placeholder="Esim. 'Kasvaimen kapselin rikkoutuminen'"
                minRows={2}
            />
        </>
    )
})

export default ProcedureComponent