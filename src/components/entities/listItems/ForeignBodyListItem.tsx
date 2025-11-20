import { observer } from "mobx-react-lite"
import { ForeignBody } from "../../../store/entity/foreignBody"
import { Autocomplete, Group, Select } from "@mantine/core"
import { ListItemProps } from "./listItemProps"
import { fetchSelectOptions } from "../../../utils/fetchJson"
import { useQuery } from "@tanstack/react-query"

const ForeignBodyListItem = observer(({ entity }: ListItemProps<ForeignBody>) => {
    const foreignBodyTypeOptions = useQuery({
        queryKey: ['foreignBodyType'],
        queryFn: fetchSelectOptions
    })

    const foreignBodyRemovalOptions = useQuery({
        queryKey: ['foreignBodyRemoval'],
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
                    value={entity.type}
                    onChange={value => { entity.type = value }}
                    label="Vierasesine"
                    data={foreignBodyTypeOptions.data}
                />
                <Select
                    value={entity.removal}
                    onChange={value => { entity.removal = value }}
                    label="Poisto"
                    data={foreignBodyRemovalOptions.data}
                />
            </Group>
        </>
    )
})

export default ForeignBodyListItem