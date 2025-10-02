import { Group, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Diagnosis } from "../../../types/form/diagnosis";
import { ItemPageInnerProps } from "../itemPageInnerProps";

const DiagnosisPage = ({ item, onUpdate }: ItemPageInnerProps<Diagnosis>) => {
    return (
        <>
            <Group preventGrowOverflow={false} grow>
                <DateInput
                    value={item.date}
                    onChange={value => onUpdate('date', value)}
                    label="Diagnoosipäivä"
                    placeholder="pp.kk.vvvv"
                />
                <TextInput
                    value={item.icd10 || ''}
                    onChange={e => onUpdate('icd10', e.target.value)}
                    label="ICD-10"
                    placeholder="ICD-10"
                    w={80}
                    flex="none"
                />
                <TextInput
                    value={item.text || ''}
                    onChange={e => onUpdate('text', e.target.value)}
                    label="Diagnoosi tekstinä"
                    placeholder="Esim. 'Neuroblastooma'"
                />
            </Group>
            <Textarea
                value={item.detail}
                onChange={e => onUpdate('detail', e.target.value)}
                label="Tarkempi kuvaus"
                placeholder="Esim. 'Ganglioblastoomakomponentti, ei NMYC-amplifikaatiota, ALK-mutaatio'"
                minRows={3}
            />
            <TextInput
                value={item.stage}
                onChange={e => onUpdate('stage', e.target.value)}
                label="Stage"
                placeholder="Esim. 'INSS stage 3, INRGSS stage L2'"
            />
            <Textarea
                value={item.spread}
                onChange={e => onUpdate('spread', e.target.value)}
                label="Levinneisyys"
                placeholder="Esim. 'Oikea lisämunuainen, ylittää keskiviivan, ei metastasointia'"
                minRows={3}
            />
        </>
    )
}

export default DiagnosisPage