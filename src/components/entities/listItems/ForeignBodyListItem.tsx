import { observer } from "mobx-react";
import { ForeignBody } from "../../../store/entity/foreignBody";
import { EntityComponentProps } from "../entityComponentProps";
import { Autocomplete, Group, Select } from "@mantine/core";
import { use } from "react";
import { StoreContext } from "../../../store/StoreContext";

const ForeignBodyListItem = observer(({ data }: EntityComponentProps<ForeignBody>) => {
    const store = use(StoreContext)
    return (
        <>
            <Group
                grow
                preventGrowOverflow={false}
                align="flex-start"
            >
                <Autocomplete
                    value={data.type}
                    onChange={value => data.setType(value)}
                    label="Vierasesine"
                    data={store.data.foreignBodyTypeOptions}
                />
                <Select
                    value={data.removal}
                    onChange={value => data.setRemoval(value)}
                    label="Poisto"
                    data={store.data.foreignBodyRemovalOptions}
                />
            </Group>
        </>
    )
})

export default ForeignBodyListItem