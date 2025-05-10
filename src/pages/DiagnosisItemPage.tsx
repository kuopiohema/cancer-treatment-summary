import {Textarea, TextInput} from '@mantine/core'
import FormattedDateInput from '../components/FormattedDateInput.tsx'
import FormRow from '../components/FormRow.tsx'
import {type Diagnosis, useFormContext} from '../formContext.ts'
import type {ItemProps} from '../types/itemProps.ts'
import getListItemPath from '../utils/getListItemPath.ts'
import ItemPage from './ItemPage.tsx'

export default function DiagnosisItemPage({path, index}: ItemProps<Diagnosis>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    return (
        <ItemPage>
            <FormRow>
                <FormattedDateInput
                    key={form.key(`${itemPath}.date`)}
                    {...form.getInputProps(`${itemPath}.date`)}
                    label="Diagnoosipäivä"
                    placeholder="Diagnoosipäivä"
                    w={120}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${itemPath}.icd10`)}
                    {...form.getInputProps(`${itemPath}.icd10`)}
                    label="ICD-10"
                    placeholder="ICD-10"
                    w={80}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${itemPath}.text`)}
                    {...form.getInputProps(`${itemPath}.text`)}
                    label="Diagnoosi tekstinä"
                    placeholder="Esim. 'Neuroblastooma'"
                />
            </FormRow>
            <Textarea
                key={form.key(`${itemPath}.detail`)}
                {...form.getInputProps(`${itemPath}.detail`)}
                label="Tarkempi kuvaus"
                placeholder="Esim. 'Ganglioblastoomakomponentti, ei NMYC-amplifikaatiota, ALK-mutaatio'"
                minRows={3}
            />
            <TextInput
                key={form.key(`${itemPath}.stage`)}
                {...form.getInputProps(`${itemPath}.stage`)}
                label="Stage"
                placeholder="Esim. 'INSS stage 3, INRGSS stage L2'"
            />
            <Textarea
                key={form.key(`${itemPath}.spread`)}
                {...form.getInputProps(`${itemPath}.spread`)}
                label="Levinneisyys"
                placeholder="Esim. 'Oikea lisämunuainen, ylittää keskiviivan, ei metastasointia'"
                minRows={3}
            />
        </ItemPage>
    )
}