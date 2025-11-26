import { PropsWithChildren, use, useState } from 'react'
import { mainStore, StoreContext } from './StoreContext'
import { DataContext } from '../data/DataContext'

const StoreProvider = ({children}: PropsWithChildren) => {
    const data = use(DataContext)
    if (!data)
        throw new Error('Data context missing!')
    
    const [store] = useState(mainStore)

    return <StoreContext value={store}>{children}</StoreContext>
}

export default StoreProvider