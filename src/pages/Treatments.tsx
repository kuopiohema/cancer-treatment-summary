import {Checkbox, type ComboboxData, Select, SimpleGrid, Textarea, TextInput} from '@mantine/core'
import {newDiagnosis, newProtocol, useFormContext} from '../formContext.ts'
import ItemCard from '../components/ItemCard.tsx'
import ItemList from '../components/ItemList.tsx'
import FormRow from '../components/FormRow.tsx'

export default function Treatments() {
    const form = useFormContext()

    const interruptionReasonOptions: ComboboxData = [
        {value: 'unknown', label: 'Ei tiedossa'},
        {value: 'toxicity', label: 'Toksisuus'},
        {value: 'refractory', label: 'Riittämätön hoitovaste'},
        {value: 'relapse', label: 'Relapsi'},
        {value: 'other', label: 'Muu, mikä?'}
    ]

    return (
        <SimpleGrid spacing="lg" cols={{base: 1, xl: 2}}>
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
            <ItemList
                form={form}
                formPath="treatments.protocols"
                itemFactory={newProtocol}
                title="Hoito-ohjelmat"
                addButtonText="Lisää hoito-ohjelma"
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
                            <FormRow>
                                <TextInput
                                    key={form.key(`${key}.startDate`)}
                                    {...form.getInputProps(`${key}.startDate`)}
                                    label="Aloituspäivä"
                                />
                                <TextInput
                                    key={form.key(`${key}.endDate`)}
                                    {...form.getInputProps(`${key}.endDate`)}
                                    label="Lopetuspäivä"
                                />
                                <Checkbox
                                    key={form.key(`${key}.interrupted`)}
                                    {...form.getInputProps(`${key}.interrupted`, { type: 'checkbox' })}
                                    label="Hoito keskeytetty"
                                />
                            </FormRow>
                            <FormRow>
                                <Select
                                    key={form.key(`${key}.interruptionReason`)}
                                    {...form.getInputProps(`${key}.interruptionReason`)}
                                    label="Keskeytyksen syy"
                                    disabled={!form.getValues().treatments.protocols[index].interrupted}
                                    data={interruptionReasonOptions}
                                />
                                <TextInput
                                    key={form.key(`${key}.interruptionReasonOther`)}
                                    {...form.getInputProps(`${key}.interruptionReasonOther`)}
                                />
                            </FormRow>
                        </ItemCard>
                    )
                })}
            </ItemList>
        </SimpleGrid>
    )
}