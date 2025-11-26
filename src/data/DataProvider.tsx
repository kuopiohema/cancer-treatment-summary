import { useQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { fetchJson } from '../utils/fetchJson.ts'
import { DataContext, type DrugEquivalenceList, emptyDrugEquivalenceList } from './DataContext.ts'

const DataProvider = ({children}: PropsWithChildren) => {
    const doxoEquivalents = useQuery({
        queryKey: ['doxoEquivalents'],
        queryFn: () => fetchJson<DrugEquivalenceList>('doxoEquivalents')
    })

    const cycloEquivalents = useQuery({
        queryKey: ['cycloEquivalents'],
        queryFn: () => fetchJson<DrugEquivalenceList>('cycloEquivalents')
    })

    return <DataContext
        value={{
            doxoEquivalents: doxoEquivalents.data ?? emptyDrugEquivalenceList,
            cycloEquivalents: cycloEquivalents.data ?? emptyDrugEquivalenceList
        }}
    >
        {children}
    </DataContext>
}

export default DataProvider