import { Autocomplete, Group, Textarea } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { observer } from 'mobx-react-lite'
import { AdverseEffect } from '../../../store/entities/adverseEffect'
import { fetchSelectOptions } from '../../../utils/fetchJson'
import { ListItemProps } from './listItemProps'

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
                    onChange={value => entity.set('organSystem', value)}
                    label="Elinjärjestelmä"
                    data={organSystemOptions.data}
                    w={300}
                    flex="none"
                />
                <Textarea
                    value={entity.description}
                    onChange={e => entity.set('description', e.target.value)}
                    label="Kuvaus"
                />
            </Group>
        </>
    )
})

export default AdverseEffectListItem