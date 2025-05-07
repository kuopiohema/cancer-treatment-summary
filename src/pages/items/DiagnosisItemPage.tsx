import {Textarea, TextInput} from '@mantine/core'
import {useFormContext} from '../../formContext.ts'
import FormRow from '../../components/FormRow.tsx'
import type {ItemPageProps} from './itemPageProps.ts'
import ItemPage from '../ItemPage.tsx'
import FormattedDateInput from '../../components/FormattedDateInput.tsx'

export default function DiagnosisItemPage({index}: ItemPageProps) {
    const form = useFormContext()
    const key = `diagnoses.${index}`

    return (
        <ItemPage>
            <FormRow>
                <FormattedDateInput
                    key={form.key(`${key}.date`)}
                    {...form.getInputProps(`${key}.date`)}
                    label="Diagnoosipäivä"
                    placeholder="Diagnoosipäivä"
                    w={120}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${key}.icd10`)}
                    {...form.getInputProps(`${key}.icd10`)}
                    label="ICD-10"
                    placeholder="ICD-10"
                    w={80}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${key}.text`)}
                    {...form.getInputProps(`${key}.text`)}
                    label="Diagnoosi tekstinä"
                />
            </FormRow>
            <TextInput
                key={form.key(`${key}.subtype`)}
                {...form.getInputProps(`${key}.subtype`)}
                label="Alatyyppi"
            />
            <TextInput
                key={form.key(`${key}.stage`)}
                {...form.getInputProps(`${key}.stage`)}
                label="Stage"
            />
            <Textarea
                key={form.key(`${key}.spread`)}
                {...form.getInputProps(`${key}.spread`)}
                label="Levinneisyys"
                minRows={3}
                autosize
            />
        </ItemPage>
    )
}