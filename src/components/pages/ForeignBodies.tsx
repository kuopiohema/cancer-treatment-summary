import { Text, Title } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { use } from 'react'
import { ForeignBody } from '../../store/entities/foreignBody'
import { EntityList } from '../../store/entityList'
import { StoreContext } from '../../store/StoreContext'
import ForeignBodyListItem from '../entities/listItems/ForeignBodyListItem'
import { EntityPageProps } from '../entities/pages/entityPageProps'
import ChildList from '../entityLists/ChildList'
import EntityPageWrapper from '../entityLists/EntityPageWrapper'

const ForeignBodiesPage = ({ entity: data }: EntityPageProps<EntityList<ForeignBody>>) => {
    return <ChildList
        entityList={data}
        entityFactory={() => new ForeignBody({})}
        title="Vierasesineet"
        emptyText="Ei vierasesineitä"
        itemName="vierasesine"
        ListItemComponent={ForeignBodyListItem}
    />
}

const ForeignBodies = observer(() => {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Vierasesineet</Title>
            <Text mb="xl">
                Syötä tälle sivulle syöpähoitoihin liittyen potilaalle laitetut vierasesineet sekä
                tieto niiden mahdollisesta poistamisesta.
            </Text>
            <EntityPageWrapper entity={store.foreignBodies} InnerComponent={ForeignBodiesPage} />
        </>
    )
})

export default ForeignBodies