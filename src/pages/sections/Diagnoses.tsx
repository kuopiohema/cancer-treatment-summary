import { Textarea, TextInput } from "@mantine/core"
import FormRow from "../../components/FormRow"
import ItemCard from "../../components/ItemCard"
import ItemList from "../../components/ItemList"
import { newDiagnosis, useFormContext } from "../../formContext"

export default function Diagnoses() {
    const form = useFormContext()

    return (
        <ItemList
            path="treatments.diagnoses"
            itemFactory={newDiagnosis}
            title="Diagnoosit"
            addButtonText="Lisää diagnoosi"
        >
            {form.getValues().treatments.diagnoses.map((item, index) => {
                const key = `treatments.diagnoses.${index}`
                return (
                    <ItemCard
                        key={item.key}
                        path="treatments.diagnoses"
                        index={index}
                        draggableId={item.key}
                    >
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
                    </ItemCard>
                )
            })}
        </ItemList>
    )
}