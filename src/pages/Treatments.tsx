import { Group, SimpleGrid, Textarea, TextInput } from '@mantine/core'
import { newDiagnosis, newProtocol, useFormContext } from '../formContext.ts'
import ItemCard from '../components/ItemCard.tsx'
import ItemList from '../components/ItemList.tsx'
import DateInputFormatted from '../components/DateInputFormatted.tsx'

export default function Treatments() {
    const form = useFormContext()

    return (
        <SimpleGrid spacing="lg" cols={{ base: 1, xl: 2 }}>
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
                        <ItemCard
                            key={item.key}
                            form={form}
                            formPath="treatments.diagnoses"
                            index={index}
                            draggableId={item.key}
                        >
                            <Group grow w="100%" preventGrowOverflow={false}>
                                <DateInputFormatted
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
                            </Group>
                            <Group grow w="100%" preventGrowOverflow={false}>
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
                            </Group>
                            <Textarea
                                key={form.key(`${key}.spread`)}
                                {...form.getInputProps(`${key}.spread`)}
                                label="Levinneisyys"
                                autosize
                            />
                        </ItemCard>
                    )
                })}
            </ItemList>
            <ItemList
                form={form}
                formPath="treatments.protocols"
                itemFactory={newProtocol}
                title="Hoito-ohjelmat"
                addButtonText='Lisää hoito-ohjelma'
            >
                {form.getValues().treatments.protocols.map((item, index) => {
                    const key = `treatments.protocols.${index}`
                    return (
                        <ItemCard
                            key={item.key}
                            form={form}
                            formPath="treatments.protocols"
                            index={index}
                            draggableId={item.key}
                        >
                            <TextInput
                                key={form.key(`${key}.protocol`)}
                                {...form.getInputProps(`${key}.protocol`)}
                                label="Protokolla tai julkaisu"
                                flex="none"
                            />
                            <TextInput
                                key={form.key(`${key}.group`)}
                                {...form.getInputProps(`${key}.group`)}
                                label="Hoitoryhmä"
                            />
                        </ItemCard>
                    )
                })}
            </ItemList>
        </SimpleGrid>
    )
}