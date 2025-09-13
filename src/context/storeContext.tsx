import { createContext } from "react"
import { EntityList } from "../hooks/useEntityList"
import { Chemotherapy } from "../types/form/chemotherapy"
import { Diagnosis } from "../types/form/diagnosis"
import { Procedure } from "../types/form/procedure"
import { Radiotherapy } from "../types/form/radiotherapy"
import { StemCellTransplant } from "../types/form/stemCellTransplant"
import { Treatment } from "../types/form/treatment"

export interface Store {
    diagnoses: EntityList<Diagnosis>
    treatments: EntityList<Treatment>
    chemotherapies: EntityList<Chemotherapy>
    radiotherapies: EntityList<Radiotherapy>
    procedures: EntityList<Procedure>
    stemCellTransplants: EntityList<StemCellTransplant>
}

export const StoreContext = createContext<Store | null>(null)