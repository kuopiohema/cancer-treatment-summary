import { Group, Stack, Text, TextInput } from "@mantine/core";
import { ItemPageProps } from "./itemPageProps";
import { Diagnosis } from "../../../../types/form/diagnosis";
import { use } from "react";
import { StoreContext } from "../../../../context/storeContext";

const DiagnosisPage = ({id}: ItemPageProps) => {
    const store = use(StoreContext)!

    const item = store.diagnoses.entities.find(entity => entity.id === id)

    if (!item)
        return (<Text>Virhe: näytettävää kohdetta ei löydy!</Text>)

    const handleUpdate = <K extends keyof Diagnosis, V extends Diagnosis[K]>(key: K, value: V) => {
        store.diagnoses.actions.update({...item, [key]: value})
    }

    return (
        <Stack gap="sm" w="600px">
            <Group preventGrowOverflow={false} grow>
                <TextInput
                    value={item.icd10}
                    onChange={e => handleUpdate('icd10', e.target.value)}
                    label="ICD-10"
                    placeholder="ICD-10"
                    w={80}
                    flex="none"
                />
            </Group>
        </Stack>
    )
}

export default DiagnosisPage