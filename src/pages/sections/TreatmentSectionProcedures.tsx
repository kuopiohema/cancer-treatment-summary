import { Text } from '@mantine/core';
import ItemList from "../../components/ItemList";
import ProcedureItem from '../../components/items/ProcedureItem';
import { ItemProps } from "../../types/itemProps";
import getListItemPath from "../../utils/getListItemPath";
import { newProcedure } from '../../form/procedure'
import type { Treatment } from '../../form/treatment'

export default function TreatmentSectionProcedures({ path, index, item }: ItemProps<Treatment>) {
    const itemPath = getListItemPath(path, index)

    return (
        <ItemList
            path={`${itemPath}.procedures`}
            itemFactory={newProcedure}
            title="Leikkaukset ja toimenpiteet"
            addButtonText="Lisää toimenpide"
        >
            {item.procedures.length === 0 && <Text>Ei toimenpiteitä</Text>}
            {item.procedures.map((item, index) => (
                <ProcedureItem
                    key={item.id}
                    path={`${itemPath}.procedures`}
                    index={index}
                    item={item}
                />
            ))}
        </ItemList>
    )
}