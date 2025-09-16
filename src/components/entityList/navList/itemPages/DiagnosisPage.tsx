import { Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { ItemPageProps } from "./itemPageProps";
import { Diagnosis } from "../../../../types/form/diagnosis";
import { use } from "react";
import { StoreContext } from "../../../../context/storeContext";
import { DateInput } from "@mantine/dates";

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
                <DateInput
                    value={item.date}
                    onChange={value => handleUpdate('date', value)}
                    label="Diagnoosipäivä"
                    placeholder="pp.kk.vvvv"
                />
                <TextInput
                    value={item.icd10}
                    onChange={e => handleUpdate('icd10', e.target.value)}
                    label="ICD-10"
                    placeholder="ICD-10"
                    w={80}
                    flex="none"
                />
                <TextInput
                    value={item.text}
                    onChange={e => handleUpdate('text', e.target.value)}
                    label="Diagnoosi tekstinä"
                    placeholder="Esim. 'Neuroblastooma'"
                />
            </Group>
            <Textarea
                value={item.detail}
                onChange={e => handleUpdate('detail', e.target.value)}
                label="Tarkempi kuvaus"
                placeholder="Esim. 'Ganglioblastoomakomponentti, ei NMYC-amplifikaatiota, ALK-mutaatio'"
                minRows={3}
            />
            <TextInput
                value={item.stage}
                onChange={e => handleUpdate('stage', e.target.value)}
                label="Stage"
                placeholder="Esim. 'INSS stage 3, INRGSS stage L2'"
            />
            <Textarea
                value={item.spread}
                onChange={e => handleUpdate('spread', e.target.value)}
                label="Levinneisyys"
                placeholder="Esim. 'Oikea lisämunuainen, ylittää keskiviivan, ei metastasointia'"
                minRows={3}
            />
        </Stack>
    )
}

export default DiagnosisPage