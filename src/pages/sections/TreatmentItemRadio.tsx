import {Fieldset, Switch, Text} from '@mantine/core'
import {useState} from 'react'
import ItemList from '../../components/ItemList'
import RadioItem from '../../components/items/RadioItem'
import {newRadiotherapy, type Treatment, useFormContext} from '../../formContext'
import type {ItemProps} from '../../types/itemProps'
import getListItemPath from '../../utils/getListItemPath'

export default function TreatmentItemRadio({path, index, item}: ItemProps<Treatment>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [radioDone, setRadioDone] = useState(item.radio.done)
    form.watch(`${itemPath}.radio.done`, ({value}: { value: boolean }) => {
        setRadioDone(value)
    })

    return (
        <Fieldset legend="Sädehoito">
            <Switch
                key={form.key(`${itemPath}.radio.done`)}
                {...form.getInputProps(`${itemPath}.radio.done`, {type: 'checkbox'})}
                label="Sädehoitoa annettu"
                pb={radioDone ? 'md' : '0'}
            />
            {radioDone && (
                <ItemList
                    path={`${itemPath}.radio.therapies`}
                    itemFactory={newRadiotherapy}
                    title="Hoidot"
                    addButtonText="Lisää sädehoito"
                >
                    {item.radio.therapies.length === 0 && <Text>Ei sädehoitoja</Text>}
                    {item.radio.therapies.map((item, index) => (
                        <RadioItem
                            key={item.id}
                            path={`${itemPath}.radio.therapies`}
                            index={index}
                            item={item}
                        />
                    ))}
                </ItemList>
            )}
        </Fieldset>
    )
}