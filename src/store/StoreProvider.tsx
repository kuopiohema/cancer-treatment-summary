import { PropsWithChildren, useState } from 'react'
import { store, StoreContext } from './StoreContext'

const StoreProvider = ({children}: PropsWithChildren) => {
    const [providedStore] = useState(store)

    return <StoreContext value={providedStore}>{children}</StoreContext>
}

export default StoreProvider