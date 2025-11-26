import { createContext } from 'react'
import { createContext as createMobxContext } from 'mobx-keystone'
import { DataStore } from './dataStore'

export interface DataContextValue {
    store: DataStore
}

export const dataStore = new DataStore({})
export const dataStoreContext = createMobxContext<DataStore>(dataStore)

export const DataContext = createContext<DataContextValue | undefined>(undefined)