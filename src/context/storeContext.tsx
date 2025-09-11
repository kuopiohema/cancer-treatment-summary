import { createContext } from "react"
import { Chemotherapy } from "../types/form/chemotherapy"
import { Diagnosis } from "../types/form/diagnosis"
import { Entity } from "../types/form/entity"
import { Procedure } from "../types/form/procedure"
import { Radiotherapy } from "../types/form/radiotherapy"
import { StemCellTransplant } from "../types/form/stemCellTransplant"
import { Treatment } from "../types/form/treatment"

export interface Store {
    diagnoses: Diagnosis[]
    treatments: Treatment[]
    chemotherapies: Chemotherapy[]
    radiotherapies: Radiotherapy[]
    procedures: Procedure[]
    stemCellTransplants: StemCellTransplant[]
}

export interface StoreActions {
    add: <T extends Entity>(path: keyof Store, itemFactory: () => T) => void
    update: <T extends Entity>(path: keyof Store, item: T) => void
    swap: (path: keyof Store, firstIndex: number, secondIndex: number) => void
    remove: (path: keyof Store, id: string) => void
}

export const StoreContext = createContext<Store | null>(null)
export const StoreActionsContext = createContext<StoreActions | null>(null)