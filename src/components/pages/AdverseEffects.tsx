import { Text, Title } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { use } from 'react'
import { AdverseEffect } from '../../store/entities/adverseEffect'
import { EntityList } from '../../store/entityList'
import { StoreContext } from '../../store/StoreContext'
import AdverseEffectListItem from '../entities/listItems/AdverseEffectListItem'
import { EntityPageProps } from '../entities/pages/entityPageProps'
import ChildList from '../entityLists/ChildList'
import EntityPageWrapper from '../entityLists/EntityPageWrapper'

const AdverseEffectsPage = ({ entity: data }: EntityPageProps<EntityList<AdverseEffect>>) => {
    return <ChildList
        entityList={data}
        entityFactory={() => new AdverseEffect({})}
        title="Haittavaikutukset"
        emptyText="Ei haittavaikutuksia"
        itemName="haittavaikutus"
        ListItemComponent={AdverseEffectListItem}
    />
}

const AdverseEffects = observer(() => {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Haittavaikutukset</Title>
            <Text mb="xl">
                Syötä tälle sivulle potilaalla todetut syöpähoitojen aiheuttamat haittavaikutukset.
            </Text>
            <EntityPageWrapper entity={store.adverseEffects} InnerComponent={AdverseEffectsPage} />
        </>
    )
})

export default AdverseEffects