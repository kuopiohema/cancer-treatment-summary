import { PropsWithChildren, useState } from 'react'
import { form, nav } from './store.ts'
import { StoreContext } from './StoreContext'

const StoreProvider = ({children}: PropsWithChildren) => {
    const [formStore] = useState(form)
    const [navStore] = useState(nav)

    return <StoreContext value={{ form: formStore, nav: navStore }}>{children}</StoreContext>
}

export default StoreProvider