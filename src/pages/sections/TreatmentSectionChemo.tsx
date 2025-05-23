import { Fieldset, Group, Stack, Text } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import ItemList from '../../components/ItemList'
import ChemoItem from '../../components/items/ChemoItem'
import { useFormContext } from '../../form/formContext'
import type { ItemProps } from '../../types/itemProps'
import getListItemPath from '../../utils/getListItemPath'
import { newChemo } from '../../form/drug'
import type { Treatment } from '../../form/treatment'

export default function TreatmentSectionChemo({ path, index, item }: ItemProps<Treatment>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    return (
        <Fieldset legend="Kemoterapia">
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
        </Fieldset>
    )
}