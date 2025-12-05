import { Autocomplete, Group, Select } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { ForeignBody } from '../../../store/entities/foreignBody'
import { ListItemProps } from './listItemProps'
import { foreignBodyRemovalOptions } from '../../../data/foreignBodyRemoval'
import { foreignBodyTypeOptions } from '../../../data/foreignBodyType'

const ForeignBodyListItem = observer(({ entity }: ListItemProps<ForeignBody>) => {
    return (
        <>
            <Group
                grow
                preventGrowOverflow={false}
                align="flex-start"
            >
                <Autocomplete
                    value={entity.type}
                    onChange={value => entity.set('type', value)}
                    label="Vierasesine"
                    data={foreignBodyTypeOptions}
                />
                <Select
                    value={entity.removal}
                    onChange={value => entity.set('removal', value)}
                    label="Poisto"
                    data={foreignBodyRemovalOptions}
                />
            </Group>
        </>
    )
})

export default ForeignBodyListItem