import { observer } from "mobx-react-lite";
import { PropsWithChildren, useEffect, useState } from "react";
import { data, form, nav } from './store.ts'
import { StoreContext } from "./StoreContext";

const StoreProvider = observer(({children}: PropsWithChildren) => {
    const [dataStore] = useState(data)
    const [formStore] = useState(form)
    const [navStore] = useState(nav)
    useEffect(() => {
        const fetchData = async() => {
            await dataStore.fetchData()
        }
        void fetchData()
    }, [dataStore])

    return <StoreContext value={{ data: dataStore, form: formStore, nav: navStore }}>{children}</StoreContext>
})

export default StoreProvider