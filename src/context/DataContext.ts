import { createContext } from 'react'

export interface DrugEquivalence {
    drug: string,
    factor: number
}

export interface DrugEquivalenceList {
    drugs: DrugEquivalence[]
    source: string
}

export const emptyDrugEquivalenceList: DrugEquivalenceList = {
    drugs: [],
    source: ''
}

export interface DataContextValue {
    doxoEquivalents: DrugEquivalenceList,
    cycloEquivalents: DrugEquivalenceList
}

export const DataContext = createContext<DataContextValue>({
    doxoEquivalents: {...emptyDrugEquivalenceList},
    cycloEquivalents: {...emptyDrugEquivalenceList}
})