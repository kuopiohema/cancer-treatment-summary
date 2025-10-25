import { observer } from "mobx-react"
import { JSX, use, useMemo } from "react"
import { CellTherapy } from "../store/entity/cellTherapy"
import { Chemotherapy } from "../store/entity/chemotherapy"
import { Diagnosis } from "../store/entity/diagnosis"
import { Entity } from "../store/entity/entity"
import { Procedure } from "../store/entity/procedure"
import { Radiotherapy } from "../store/entity/radiotherapy"
import { Treatment } from "../store/entity/treatment"
import { StoreContext } from "../store/StoreContext"
import CellTherapyComponent from "./entityComponents/CellTherapyComponent"
import ChemotherapyComponent from "./entityComponents/ChemotherapyComponent"
import DiagnosisComponent from "./entityComponents/DiagnosisComponent"
import ProcedureComponent from "./entityComponents/ProcedureComponent"
import RadiotherapyComponent from "./entityComponents/RadiotherapyComponent"
import TreatmentComponent from "./entityComponents/TreatmentComponent"
import EntityPage from "./entityLists/EntityPage"
import AdverseEffects from "./pages/AdverseEffects"
import ErrorPage from "./pages/ErrorPage"
import Followup from "./pages/Followup"
import ForeignBodies from "./pages/ForeignBodies"
import Signature from "./pages/Signature"
import Start from "./pages/Start"

const getEntityPage = (entity: Entity | undefined): JSX.Element => {
    if (entity instanceof Diagnosis)
        return <EntityPage entity={entity} InnerComponent={DiagnosisComponent} />
    if (entity instanceof Treatment)
        return <EntityPage entity={entity} InnerComponent={TreatmentComponent} />
    if (entity instanceof Chemotherapy)
        return <EntityPage entity={entity} InnerComponent={ChemotherapyComponent} />
    if (entity instanceof Radiotherapy)
        return <EntityPage entity={entity} InnerComponent={RadiotherapyComponent} />
    if (entity instanceof Procedure)
        return <EntityPage entity={entity} InnerComponent={ProcedureComponent} />
    if (entity instanceof CellTherapy)
        return <EntityPage entity={entity} InnerComponent={CellTherapyComponent} />
    return <ErrorPage error={"Kohdetta ei löydy!"} />
}

const PageDisplay = observer(() => {
    const store = use(StoreContext)
    const Page: JSX.Element = useMemo(() => {
        switch (store.nav.page) {
            case 'start': return <Start />
            case 'foreignBodies': return <ForeignBodies />
            case 'adverseEffects': return <AdverseEffects />
            case 'followup': return <Followup />
            case 'signature': return <Signature />
            case 'entity': return getEntityPage(store.nav.selectedEntity?.current)
            default: return <ErrorPage error="Sivua ei löydy!" />
        }
    }, [store.nav.page, store.nav.selectedEntity])
    return Page
})

export default PageDisplay