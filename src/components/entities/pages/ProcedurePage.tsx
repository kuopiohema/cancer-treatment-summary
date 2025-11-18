import { observer } from "mobx-react-lite";
import { Procedure } from "../../../store/entity/procedure";
import { EntityPageProps } from "./entityPageProps";
import { Group, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const ProcedurePage = observer(({ entity }: EntityPageProps<Procedure>) => {
    return (
        <>
            <Group grow preventGrowOverflow={false}>
                <DateInput
                    value={entity.date}
                    onChange={value => { entity.date = value }}
                    label="Päivämäärä"
                />
                <TextInput
                    value={entity.procedure}
                    onChange={e => { entity.procedure = e.target.value }}
                    label="Toimenpide"
                    placeholder="Esim. 'Nefrektomia'"
                />
            </Group>
            <Textarea
                value={entity.details}
                onChange={e => { entity.details = e.target.value }}
                label="Tarkempi kuvaus"
                placeholder="Esim. 'Oikean munuaisen poisto kasvaimen mukana. Samalla poistettu vatsaontelon imusolmukkeita.'"
                minRows={2}
            />
            <Textarea
                value={entity.complications}
                onChange={e => { entity.complications = e.target.value }}
                label="Komplikaatiot"
                placeholder="Esim. 'Kasvaimen kapselin rikkoutuminen'"
                minRows={2}
            />
        </>
    )
})

export default ProcedurePage