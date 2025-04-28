import {Button, Group, Paper, Stack, TextInput, Title} from '@mantine/core'
import {newDiagnosis, useFormContext} from '../formContext.ts'
import ItemCard from '../components/ItemCard.tsx'

export default function Treatments() {
    const form = useFormContext()

    return (
        <Stack gap="lg">
            <Title order={1}>Diagnoosit ja hoidot</Title>
            <Paper shadow="sm" withBorder p="md">
                <Title order={2}>Diagnoosit</Title>
                {form.getValues().treatments.diagnoses.map((item, index) => {
                        const key = `treatments.diagnoses.${index}`
                        return (
                            <ItemCard key={item.key} form={form} formPath="treatments.diagnoses" index={index}>
                                <Group>
                                    <TextInput
                                        key={form.key(`${key}.icd10`)}
                                        {...form.getInputProps(`${key}.icd10`)}
                                        label="ICD-10"
                                    />
                                    <TextInput
                                        key={form.key(`${key}.text`)}
                                        {...form.getInputProps(`${key}.text`)}
                                        label="Diagnoosi tekstinä"
                                    />
                                </Group>
                            </ItemCard>
                        )
                    }
                )}
                <Button onClick={() => form.insertListItem('treatments.diagnoses', newDiagnosis())}>
                    Lisää diagnoosi
                </Button>
            </Paper>
        </Stack>
    )
}