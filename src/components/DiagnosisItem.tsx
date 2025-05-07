import {Textarea, TextInput} from '@mantine/core'
import {useFormContext} from '../formContext'
import FormRow from './FormRow'

interface DiagnosisItemProps {
    index: number
}

export default function DiagnosisItem({index}: DiagnosisItemProps) {
    const form = useFormContext()
    const key = `diagnoses.${index}`

    return (
        <>
            <FormRow>
                <TextInput
                    key={form.key(`${key}.date`)}
                    {...form.getInputProps(`${key}.date`)}
                    label="Diagnoosipäivä"
                    w={120}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${key}.icd10`)}
                    {...form.getInputProps(`${key}.icd10`)}
                    label="ICD-10"
                    w={80}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${key}.text`)}
                    {...form.getInputProps(`${key}.text`)}
                    label="Diagnoosi tekstinä"
                />
            </FormRow>
            <FormRow>
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
            </FormRow>
            <Textarea
                key={form.key(`${key}.spread`)}
                {...form.getInputProps(`${key}.spread`)}
                label="Levinneisyys"
                autosize
            />
        </>
    )
}