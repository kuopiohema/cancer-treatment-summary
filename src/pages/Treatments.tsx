import { Group, Stack, TextInput, Title } from '@mantine/core'
import { newDiagnosis, useFormContext } from '../formContext.ts'
import ItemCard from '../components/ItemCard.tsx'
import ItemList from '../components/ItemList.tsx'

export default function Treatments() {
    const form = useFormContext()

    return (
        <Stack gap="lg">
            <Title order={1}>Diagnoosit ja hoidot</Title>
            <ItemList
                form={form}
                formPath="treatments.diagnoses"
                itemFactory={newDiagnosis}
                title="Diagnoosit"
                addButtonText="Lisää diagnoosi"
            >
                {form.getValues().treatments.diagnoses.map((item, index) => {
                    const key = `treatments.diagnoses.${index}`
                    return (
                        <ItemCard key={item.key} form={form} formPath="treatments.diagnoses" index={index} draggableId={item.key}>
                            <Group grow w="100%" preventGrowOverflow={false}>
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
                            </Group>
                        </ItemCard>
                    )
                })}
            </ItemList>
        </Stack>
    )
}