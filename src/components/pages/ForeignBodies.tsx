import {Text, Title} from '@mantine/core'
import { use } from 'react'
import { StoreContext } from '../../store/StoreContext'
import ChildList from '../entityLists/ChildList'
import { ForeignBody } from '../../store/entity/foreignBody'
import { EntityPageProps } from '../entities/pages/entityPageProps'
import EntityPageWrapper from '../entityLists/EntityPageWrapper'
import { EntityList } from '../../store/entityList'
import ForeignBodyListItem from '../entities/listItems/ForeignBodyListItem'
import { observer } from 'mobx-react-lite'

const ForeignBodiesPage = ({ entity: data }: EntityPageProps<EntityList<ForeignBody>>) => {
    return <ChildList
        entityList={data}
        entityFactory={() => new ForeignBody()}
        title="Vierasesineet"
        emptyText="Ei vierasesineitä"
        addButtonText="Lisää vierasesine"
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
            <EntityPageWrapper entity={store.form.foreignBodies} InnerComponent={ForeignBodiesPage} />
        </>
    )
})

export default ForeignBodies