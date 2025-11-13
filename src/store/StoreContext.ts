import { createContext } from "react";
import { Data } from './data.ts'
import type { FormStore } from './formStore.ts'
import type { NavStore } from './navStore.ts'
import { data, form, nav } from './store'

interface StoreContextValue {
    data: Data,
    form: FormStore,
    nav: NavStore
}

export const StoreContext = createContext<StoreContextValue>({ data, form, nav })