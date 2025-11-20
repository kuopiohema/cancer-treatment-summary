import { observer } from "mobx-react-lite"
import { AdverseEffect } from "../../../store/entity/adverseEffect"
import { Autocomplete, Group, Textarea } from "@mantine/core"
import { ListItemProps } from "./listItemProps"
import { useQuery } from "@tanstack/react-query"
import { fetchSelectOptions } from "../../../utils/fetchJson"

const AdverseEffectListItem = observer(({ entity }: ListItemProps<AdverseEffect>) => {
    const organSystemOptions = useQuery({
        queryKey: ['organSystem'],
        queryFn: fetchSelectOptions
    })

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
                    data={organSystemOptions.data}
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