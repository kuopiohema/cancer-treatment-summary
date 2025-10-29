import { observer } from "mobx-react";
import { AdverseEffect } from "../../../store/entity/adverseEffect";
import { EntityComponentProps } from "../entityComponentProps";
import { StoreContext } from "../../../store/StoreContext";
import { use } from "react";
import { Autocomplete, Group, Textarea } from "@mantine/core";

const AdverseEffectListItem = observer(({ data }: EntityComponentProps<AdverseEffect>) => {
    const store = use(StoreContext)
    return (
        <>
            <Group
                grow
                preventGrowOverflow={false}
                align="flex-start"
            >
                <Autocomplete
                    value={data.organSystem}
                    onChange={value => data.setOrganSystem(value)}
                    label="Elinjärjestelmä"
                    data={store.data.organSystemOptions}
                    w={300}
                    flex="none"
                />
                <Textarea
                    value={data.description}
                    onChange={e => data.setDescription(e.target.value)}
                    label="Kuvaus"
                />
            </Group>
        </>
    )
})

export default AdverseEffectListItem