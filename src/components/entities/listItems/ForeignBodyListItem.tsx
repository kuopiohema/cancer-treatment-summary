import { observer } from "mobx-react-lite";
import { ForeignBody } from "../../../store/entity/foreignBody";
import { Autocomplete, Group, Select } from "@mantine/core";
import { use } from "react";
import { StoreContext } from "../../../store/StoreContext";
import { ListItemProps } from "./listItemProps";

const ForeignBodyListItem = observer(({ entity }: ListItemProps<ForeignBody>) => {
    const store = use(StoreContext)
    
    return (
        <>
            <Group
                grow
                preventGrowOverflow={false}
                align="flex-start"
            >
                <Autocomplete
                    value={entity.type}
                    onChange={value => { entity.type = value }}
                    label="Vierasesine"
                    data={store.data.foreignBodyTypeOptions}
                />
                <Select
                    value={entity.removal}
                    onChange={value => { entity.removal = value }}
                    label="Poisto"
                    data={store.data.foreignBodyRemovalOptions}
                />
            </Group>
        </>
    )
})

export default ForeignBodyListItem