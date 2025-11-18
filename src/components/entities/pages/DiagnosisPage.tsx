import { Group, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { EntityPageProps } from "./entityPageProps";
import { Diagnosis } from "../../../store/entity/diagnosis";
import { observer } from "mobx-react-lite";

const DiagnosisPage = observer(({ entity }: EntityPageProps<Diagnosis>) => {   
    return (
        <>
            <Group preventGrowOverflow={false} grow>
                <DateInput
                    value={entity.date}
                    onChange={value => { entity.date = value }}
                    label="Diagnoosipäivä"
                />
                <TextInput
                    value={entity.icd10}
                    onChange={e => { entity.icd10 = e.target.value }}
                    label="ICD-10"
                    placeholder="ICD-10"
                    w={80}
                    flex="none"
                />
                <TextInput
                    value={entity.text}
                    onChange={e => { entity.text = e.target.value }}
                    label="Diagnoosi tekstinä"
                    placeholder="Esim. 'Neuroblastooma'"
                />
            </Group>
            <Textarea
                value={entity.detail}
                onChange={e => { entity.detail = e.target.value }}
                label="Tarkempi kuvaus"
                placeholder="Esim. 'Ganglioblastoomakomponentti, ei NMYC-amplifikaatiota, ALK-mutaatio'"
                minRows={3}
            />
            <TextInput
                value={entity.stage}
                onChange={e => { entity.stage = e.target.value }}
                label="Stage"
                placeholder="Esim. 'INSS stage 3, INRGSS stage L2'"
            />
            <Textarea
                value={entity.spread}
                onChange={e => { entity.spread = e.target.value }}
                label="Levinneisyys"
                placeholder="Esim. 'Oikea lisämunuainen, ylittää keskiviivan, ei metastasointia'"
                minRows={3}
            />
        </>
    )
})

export default DiagnosisPage