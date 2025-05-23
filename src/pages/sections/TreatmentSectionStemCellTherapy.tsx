import {Text} from '@mantine/core'
import ItemList from '../../components/ItemList.tsx'
import StemCellTherapyItem from '../../components/items/StemCellTherapyItem.tsx'
import {newStemCellTherapy} from '../../form/stemCellTherapy.ts'
import type {Treatment} from '../../form/treatment.ts'
import type {ItemProps} from '../../types/itemProps.ts'
import getListItemPath from '../../utils/getListItemPath'

export default function TreatmentSectionStemCellTherapy({path, index, item}: ItemProps<Treatment>) {
    const itemPath = getListItemPath(path, index)

    return (
        <ItemList
            path={`${itemPath}.stemCellTherapies`}
            itemFactory={newStemCellTherapy}
            title="Kantasolusiirrot"
            addButtonText="Lisää kantasolusiirto"
        >
            {item.stemCellTherapies.length === 0 && <Text>Ei kantasolusiirtoja</Text>}
            {item.stemCellTherapies.map((item, index) => (
                <StemCellTherapyItem
                    key={item.id}
                    path={`${itemPath}.stemCellTherapies`}
                    index={index}
                    item={item}
                />
            ))}
        </ItemList>
    )
}