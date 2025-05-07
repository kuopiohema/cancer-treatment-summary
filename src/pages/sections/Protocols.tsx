import { ComboboxData, Select, TextInput } from "@mantine/core"
import { useState } from "react"
import FormRow from "../../components/FormRow"
import ItemCard from "../../components/ItemCard"
import ItemList from "../../components/ItemList"
import { newProtocol, Protocol, useFormContext } from "../../formContext"

const ProtocolItem = ({item, index}: {item: Protocol, index: number}) => {
    const form = useFormContext()
    const key = `treatments.protocols.${index}`

    const stopReasonOptions: ComboboxData = [
        {value: 'completed', label: 'Hoito päättynyt'},
        {value: 'toxicity', label: 'Toksisuus'},
        {value: 'refractory', label: 'Riittämätön hoitovaste'},
        {value: 'relapse', label: 'Relapsi'},
        {value: 'unknown', label: 'Ei tiedossa'},
        {value: 'other', label: 'Muu, mikä?'}
    ]

    const values = form.getValues().treatments.protocols[index]

    const [stopReasonOther, setStopReasonOther] = useState(values.stopReason === 'other')
    form.watch(`${key}.stopReason`, ({ value }) => {
        setStopReasonOther(value === 'other')
    })

    return (
        <ItemCard
            key={item.id}
            path="treatments.protocols"
            index={index}
            draggableId={item.id}
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
            </FormRow>
            <FormRow>
                <Select
                    key={form.key(`${key}.stopReason`)}
                    {...form.getInputProps(`${key}.stopReason`)}
                    label="Hoidon loppumisen syy"
                    data={stopReasonOptions}
                    w={200}
                    flex="none"
                />
                <TextInput
                    key={form.key(`${key}.stopReasonOther`)}
                    {...form.getInputProps(`${key}.stopReasonOther`)}
                    disabled={!stopReasonOther}
                />
            </FormRow>
        </ItemCard>
    )
}

export default function Protocols() {
    const form = useFormContext()

    return (
        <ItemList
                path="treatments.protocols"
                itemFactory={newProtocol}
                title="Hoito-ohjelmat"
                addButtonText="Lisää hoito-ohjelma"
        >
            {form.getValues().treatments.protocols.map((item, index) => <ProtocolItem key={item.id} item={item} index={index} />)}
        </ItemList>
    )
}