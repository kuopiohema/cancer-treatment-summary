import { DataContext, dataStore } from './DataContext.ts'
import { type PropsWithChildren, useEffect, useState } from 'react'

const DataProvider = ({children}: PropsWithChildren) => {
    const [store] = useState(dataStore)

    useEffect(() => {
        const fetchData = async () => await store.fetchData()
        void fetchData()
    }, [store])

    return <DataContext value={{store}}>
        {children}
    </DataContext>
}

export default DataProvider