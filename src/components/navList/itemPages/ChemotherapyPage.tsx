import { Group } from "@mantine/core";
import { Chemotherapy } from "../../../types/form/chemotherapy";
import { ItemPageInnerProps } from "../itemPageInnerProps";
import { DateInput } from "@mantine/dates";
import { Drug, newDrug } from "../../../types/form/drug";
import EntityList from "../../entityList/EntityList";
import DrugListItem from "../../entityList/items/DrugListItem";
import { useEntityStore } from "../../../hooks/useEntityStore";

const ChemotherapyPage = ({ item, onUpdate }: ItemPageInnerProps<Chemotherapy>) => {
    const drugsStore = useEntityStore<Drug>(newDrug, undefined, data => onUpdate('drugs', data), item.drugs)

    return (
        <>
            <Group>
                <DateInput
                    value={item.startDate}
                    onChange={value => onUpdate('startDate', value)}
                    label="Aloituspäivä"
                    placeholder="Aloituspäivä"
                />
                <DateInput
                    value={item.endDate}
                    onChange={value => onUpdate('endDate', value)}
                    label="Lopetuspäivä"
                    placeholder="Lopetuspäivä"
                />
            </Group>
            {/*<EntityList
                entityStore={drugsStore}
                ItemComponent={DrugListItem}
                title="Sytostaatit"
                emptyText="Ei sytostaatteja"
                addButtonText="Lisää sytostaatti"
            />*/}
        </>
    )
}

export default ChemotherapyPage