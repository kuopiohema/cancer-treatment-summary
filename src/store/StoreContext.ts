import { createContext } from 'react'
import type { FormStore } from './formStore.ts'
import type { NavStore } from './navStore.ts'
import { form, nav } from './store'

interface StoreContextValue {
    form: FormStore,
    nav: NavStore
}

export const StoreContext = createContext<StoreContextValue>({ form, nav })