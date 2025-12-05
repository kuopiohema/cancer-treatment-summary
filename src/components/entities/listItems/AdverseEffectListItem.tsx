import { Autocomplete, Group, Textarea } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { AdverseEffect } from '../../../store/entities/adverseEffect'
import { ListItemProps } from './listItemProps'
import { organSystemOptions } from '../../../data/organSystem'

const AdverseEffectListItem = observer(({ entity }: ListItemProps<AdverseEffect>) => {
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
                    data={organSystemOptions}
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