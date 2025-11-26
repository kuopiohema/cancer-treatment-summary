import { createContext } from 'react'
import { Store } from './store'

export const mainStore = new Store({})
export const StoreContext = createContext<Store | undefined>(undefined)