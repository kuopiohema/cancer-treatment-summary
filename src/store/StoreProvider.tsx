import { observer } from "mobx-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { rootStore } from "./store";
import { StoreContext } from "./StoreContext";

const StoreProvider = observer(({children}: PropsWithChildren) => {
    const [store] = useState(rootStore)
    useEffect(() => {
        const fetchData = async() => {
            await store.data.fetchData()
        }
        void fetchData()
    }, [store.data])

    return <StoreContext value={store}>{children}</StoreContext>
})

export default StoreProvider