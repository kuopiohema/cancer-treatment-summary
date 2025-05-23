import { Fieldset, Stack } from "@mantine/core";
import { Treatment, useFormContext } from "../../formContext";
import getListItemPath from "../../utils/getListItemPath";
import { DateInput } from "@mantine/dates";

export default function TreatmentSectionCell({ path, index, item }): ItemProps<Treatment> {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    return (
        <Fieldset legend="Soluterapiat">
            <Stack gap="sm">
                <DateInput
                    key={form.key(`${itemPath}.date`)}
                    {...form.getInputProps(`${itemPath}.chemo.date`)}
                    
            </Stack>
        </Fieldset>
    )
}