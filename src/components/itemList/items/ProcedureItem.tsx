import { DateInput } from "@mantine/dates";
import { ItemProps } from "../../../types/itemProps";
import getListItemPath from "../../../utils/getListItemPath";
import { Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useFormContext } from '../../../form/formContext'
import type { Procedure } from '../../../form/procedure'

export default function ProcedureItem({path, index}: ItemProps<Procedure>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    return (
        <Stack gap="sm" w="600px">
            <Group grow preventGrowOverflow={false}>
                <DateInput
                    key={form.key(`${itemPath}.date`)}
                    {...form.getInputProps(`${itemPath}.date`)}
                    label="Päivämäärä"
                    placeholder="Päivämäärä"
                />
                <TextInput
                    key={form.key(`${itemPath}.procedure`)}
                    {...form.getInputProps(`${itemPath}.procedure`)}
                    label="Toimenpide"
                    placeholder="Esim. 'Nefrektomia'"
                />
            </Group>
            <Textarea
                key={form.key(`${itemPath}.details`)}
                {...form.getInputProps(`${itemPath}.details`)}
                label="Tarkempi kuvaus"
                placeholder="Esim. 'Oikean munuaisen poisto kasvaimen mukana. Samalla poistettu vatsaontelon imusolmukkeita.'"
                minRows={2}
            />
            <Textarea
                key={form.key(`${itemPath}.complications`)}
                {...form.getInputProps(`${itemPath}.complications`)}
                label="Komplikaatiot"
                placeholder="Esim. 'Kasvaimen kapselin rikkoutuminen'"
                minRows={2}
            />
        </Stack>
    )
}