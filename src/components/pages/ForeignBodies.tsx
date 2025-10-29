import {Text, Title} from '@mantine/core'
import { use } from 'react'
import { StoreContext } from '../../store/StoreContext'
import ChildList from '../entityLists/ChildList'
import { observer } from 'mobx-react'
import { ForeignBody } from '../../store/entity/foreignBody'
import { EntityComponentProps } from '../entities/entityComponentProps'
import EntityPage from '../entityLists/EntityPage'
import { EntityList } from '../../store/entityList'
import ForeignBodyListItem from '../entities/listItems/ForeignBodyListItem'

const ForeignBodiesPage = observer(({ data }: EntityComponentProps<EntityList<ForeignBody>>) => {
    return <ChildList
        entityList={data}
        entityFactory={() => new ForeignBody({})}
        title="Vierasesineet"
        emptyText="Ei vierasesineitä"
        addButtonText="Lisää vierasesine"
        ListItemComponent={ForeignBodyListItem}
    />
})

const ForeignBodies = () => {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Vierasesineet</Title>
            <Text mb="xl">
                Syötä tälle sivulle syöpähoitoihin liittyen potilaalle laitetut vierasesineet sekä
                tieto niiden mahdollisesta poistamisesta.
            </Text>
            <EntityPage entity={store.form.foreignBodies} InnerComponent={ForeignBodiesPage} />
        </>
    )
}

export default ForeignBodies