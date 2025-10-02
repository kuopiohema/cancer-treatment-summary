import { Group, TextInput } from "@mantine/core";
import { toComboboxData } from "../../../data/dataUtils";
import { drugDosingOptions } from "../../../data/drugDosingOptions";
import { Drug } from "../../../types/form/drug";
import { EntityListItemInnerProps } from "../EntityListItem";

const DrugListItem = ({item, onUpdate}: EntityListItemInnerProps<Drug>) => {
    const drugDosingOptionsData = toComboboxData(drugDosingOptions)

    return (
        <>
            <Group
                grow
                preventGrowOverflow={false}
                align="flex-start"
            >
                <TextInput
                    value={item.drug}
                    onChange={e => onUpdate('drug', e.target.value)}
                    label="Lääke"
                    placeholder="Lääkkeen nimi"
                    w={220}
                    flex="none"
                />
            </Group>
        </>
    )
}

export default DrugListItem