import {Fieldset, Group, Stack, Switch, Text} from '@mantine/core'
import {DateInput} from '@mantine/dates'
import {useState} from 'react'
import ItemList from '../../components/ItemList'
import ChemoItem from '../../components/items/ChemoItem'
import {newChemo, type Treatment, useFormContext} from '../../formContext'
import type {ItemProps} from '../../types/itemProps'
import getListItemPath from '../../utils/getListItemPath'

export default function TreatmentItemChemo({path, index, item}: ItemProps<Treatment>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [chemoDone, setChemoDone] = useState(item.chemo.done)
    form.watch(`${itemPath}.chemo.done`, ({value}: { value: boolean }) => {
        setChemoDone(value)
    })

    return (
        <Fieldset legend="Kemoterapia">
            <Switch
                key={form.key(`${itemPath}.chemo.done`)}
                {...form.getInputProps(`${itemPath}.chemo.done`, {type: 'checkbox'})}
                label="Kemoterapiaa annettu"
                pb={chemoDone ? 'md' : '0'}
            />
            {chemoDone && (
                <Stack gap="sm">
                    <Group>
                        <DateInput
                            key={form.key(`${itemPath}.chemo.startDate`)}
                            {...form.getInputProps(`${itemPath}.chemo.startDate`)}
                            label="Aloituspäivä"
                            placeholder="Aloituspäivä"
                        />
                        <DateInput
                            key={form.key(`${itemPath}.chemo.endDate`)}
                            {...form.getInputProps(`${itemPath}.chemo.endDate`)}
                            label="Lopetuspäivä"
                            placeholder="Lopetuspäivä"
                        />
                    </Group>
                    <ItemList
                        path={`${itemPath}.chemo.drugs`}
                        itemFactory={newChemo}
                        title="Sytostaatit"
                        addButtonText="Lisää sytostaatti"
                    >
                        {item.chemo.drugs.length === 0 && <Text>Ei sytostaatteja</Text>}
                        {item.chemo.drugs.map((item, index) => (
                            <ChemoItem
                                key={item.id}
                                path={`${itemPath}.chemo.drugs`}
                                index={index}
                                item={item}
                            />
                        ))}
                    </ItemList>
                </Stack>
            )}
        </Fieldset>
    )
}