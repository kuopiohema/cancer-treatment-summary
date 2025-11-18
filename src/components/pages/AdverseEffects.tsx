import {Title, Text} from '@mantine/core'
import EntityPageWrapper from '../entityLists/EntityPageWrapper'
import { use } from 'react'
import { StoreContext } from '../../store/StoreContext'
import { EntityList } from '../../store/entityList'
import { AdverseEffect } from '../../store/entity/adverseEffect'
import { EntityPageProps } from '../entities/pages/entityPageProps'
import ChildList from '../entityLists/ChildList'
import AdverseEffectListItem from '../entities/listItems/AdverseEffectListItem'
import { observer } from 'mobx-react-lite'

const AdverseEffectsPage = ({ entity: data }: EntityPageProps<EntityList<AdverseEffect>>) => {
    return <ChildList
        entityList={data}
        entityFactory={() => new AdverseEffect()}
        title="Haittavaikutukset"
        emptyText="Ei haittavaikutuksia"
        addButtonText="Lisää haittavaikutus"
        ListItemComponent={AdverseEffectListItem}
    />
}

const AdverseEffects = observer(() => {
    const { form } = use(StoreContext)
    return (
        <>
            <Title order={1}>Haittavaikutukset</Title>
            <Text mb="xl">
                Syötä tälle sivulle potilaalla todetut syöpähoitojen aiheuttamat haittavaikutukset.
            </Text>
            <EntityPageWrapper entity={form.adverseEffects} InnerComponent={AdverseEffectsPage} />
        </>
    )
})

export default AdverseEffects