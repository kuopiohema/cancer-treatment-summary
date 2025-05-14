import { Text } from '@mantine/core'
import ItemList from '../../components/ItemList'
import RadioItem from '../../components/items/RadioItem'
import { newRadiotherapy, type Treatment } from '../../formContext'
import type { ItemProps } from '../../types/itemProps'
import getListItemPath from '../../utils/getListItemPath'

export default function TreatmentItemRadio({path, index, item}: ItemProps<Treatment>) {
    const itemPath = getListItemPath(path, index)

    return (
        <ItemList
            path={`${itemPath}.radiotherapies`}
            itemFactory={newRadiotherapy}
            title="Sädehoito"
            addButtonText="Lisää sädehoito"
        >
            {item.radiotherapies.length === 0 && <Text>Ei sädehoitoja</Text>}
            {item.radiotherapies.map((item, index) => (
                <RadioItem
                    key={item.id}
                    path={`${itemPath}.radiotherapies`}
                    index={index}
                    item={item}
                />
            ))}
        </ItemList>
    )
}