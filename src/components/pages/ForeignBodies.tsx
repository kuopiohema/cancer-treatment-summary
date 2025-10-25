import {Text, Title} from '@mantine/core'
import { use } from 'react'
import { StoreContext } from '../../store/StoreContext'
import ChildList from '../entityLists/ChildList'
import { observer } from 'mobx-react'
import { ForeignBody } from '../../store/entity/foreignBody'
import { EntityComponentProps } from '../entityComponents/entityComponentProps'
import EntityPage from '../entityLists/EntityPage'
import { EntityList } from '../../store/entityList'
import ForeignBodyComponent from '../entityComponents/ForeignBodyComponent'

const ForeignBodiesComponent = observer(({ data }: EntityComponentProps<EntityList<ForeignBody>>) => {
    return <ChildList
        entityList={data}
        entityFactory={() => new ForeignBody({})}
        title="Vierasesineet"
        emptyText="Ei vierasesineitä"
        addButtonText="Lisää vierasesine"
        ListItemComponent={ForeignBodyComponent}
    />
})

const ForeignBodies = () => {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Vierasesineet</Title>
            <Text>
                Syötä tälle sivulle syöpähoitoihin liittyen potilaalle laitetut vierasesineet sekä
                tieto niiden mahdollisesta poistamisesta.
            </Text>
            <EntityPage entity={store.form.foreignBodies} InnerComponent={ForeignBodiesComponent} />
        </>
    )
}

export default ForeignBodies