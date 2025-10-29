import {Title, Text} from '@mantine/core'
import EntityPage from '../entityLists/EntityPage'
import { use } from 'react'
import { StoreContext } from '../../store/StoreContext'
import { observer } from 'mobx-react'
import { EntityList } from '../../store/entityList'
import { AdverseEffect } from '../../store/entity/adverseEffect'
import { EntityComponentProps } from '../entities/entityComponentProps'
import ChildList from '../entityLists/ChildList'
import AdverseEffectListItem from '../entities/listItems/AdverseEffectListItem'

const AdverseEffectsPage = observer(({ data }: EntityComponentProps<EntityList<AdverseEffect>>) => {
    return <ChildList
        entityList={data}
        entityFactory={() => new AdverseEffect({})}
        title="Haittavaikutukset"
        emptyText="Ei haittavaikutuksia"
        addButtonText="Lisää haittavaikutus"
        ListItemComponent={AdverseEffectListItem}
    />
})

const AdverseEffects = () => {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Haittavaikutukset</Title>
            <Text mb="xl">
                Syötä tälle sivulle potilaalla todetut syöpähoitojen aiheuttamat haittavaikutukset.
            </Text>
            <EntityPage entity={store.form.adverseEffects} InnerComponent={AdverseEffectsPage} />
        </>
    )
}

export default AdverseEffects