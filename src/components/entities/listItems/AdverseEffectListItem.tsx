import { observer } from "mobx-react-lite"
import { AdverseEffect } from "../../../store/entity/adverseEffect"
import { StoreContext } from "../../../store/StoreContext"
import { use } from "react"
import { Autocomplete, Group, Textarea } from "@mantine/core"
import { ListItemProps } from "./listItemProps"

const AdverseEffectListItem = observer(({ entity }: ListItemProps<AdverseEffect>) => {
    const store = use(StoreContext)

    return (
        <>
            <Group
                grow
                preventGrowOverflow={false}
                align="flex-start"
            >
                <Autocomplete
                    value={entity.organSystem}
                    onChange={value => { entity.organSystem = value }}
                    label="Elinjärjestelmä"
                    data={store.data.organSystemOptions}
                    w={300}
                    flex="none"
                />
                <Textarea
                    value={entity.description}
                    onChange={e => { entity.description = e.target.value }}
                    label="Kuvaus"
                />
            </Group>
        </>
    )
})

export default AdverseEffectListItem