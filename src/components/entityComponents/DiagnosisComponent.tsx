import { Group, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { EntityComponentProps } from "./entityComponentProps";
import { Diagnosis } from "../../store/diagnosis";
import { observer } from "mobx-react";

const DiagnosisComponent = observer(({ data }: EntityComponentProps<Diagnosis>) => {   
    return (
        <>
            <Group preventGrowOverflow={false} grow>
                <DateInput
                    value={data.date}
                    onChange={value => data.setDate(value)}
                    label="Diagnoosipäivä"
                    placeholder="pp.kk.vvvv"
                />
                <TextInput
                    value={data.icd10}
                    onChange={e => data.setIcd10(e.target.value)}
                    label="ICD-10"
                    placeholder="ICD-10"
                    w={80}
                    flex="none"
                />
                <TextInput
                    value={data.text}
                    onChange={e => data.setText(e.target.value)}
                    label="Diagnoosi tekstinä"
                    placeholder="Esim. 'Neuroblastooma'"
                />
            </Group>
            <Textarea
                value={data.detail}
                onChange={e => data.setDetail(e.target.value)}
                label="Tarkempi kuvaus"
                placeholder="Esim. 'Ganglioblastoomakomponentti, ei NMYC-amplifikaatiota, ALK-mutaatio'"
                minRows={3}
            />
            <TextInput
                value={data.stage}
                onChange={e => data.setStage(e.target.value)}
                label="Stage"
                placeholder="Esim. 'INSS stage 3, INRGSS stage L2'"
            />
            <Textarea
                value={data.spread}
                onChange={e => data.setSpread(e.target.value)}
                label="Levinneisyys"
                placeholder="Esim. 'Oikea lisämunuainen, ylittää keskiviivan, ei metastasointia'"
                minRows={3}
            />
        </>
    )
})

export default DiagnosisComponent