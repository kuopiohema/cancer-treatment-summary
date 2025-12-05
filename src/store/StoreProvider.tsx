import { PropsWithChildren, useState } from 'react'
import { mainStore, StoreContext } from './StoreContext'

const StoreProvider = ({children}: PropsWithChildren) => {
    const [store] = useState(mainStore)

    return <StoreContext value={store}>{children}</StoreContext>
}

export default StoreProvider