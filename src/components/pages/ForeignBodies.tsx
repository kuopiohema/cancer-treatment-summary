import {Text, Title} from '@mantine/core'
import { use } from 'react'
import { StoreContext } from '../../store/StoreContext'
import ChildList from '../entityLists/ChildList'

const ForeignBodies = () => {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Vierasesineet</Title>
            <Text>
                Syötä tälle sivulle syöpähoitoihin liittyen potilaalle laitetut vierasesineet sekä
                tieto niiden mahdollisesta poistamisesta.
            </Text>
            
        </>
    )
}

export default ForeignBodies