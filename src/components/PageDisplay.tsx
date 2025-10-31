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
import CellTherapyPage from "./entities/pages/CellTherapyPage"
import ChemotherapyPage from "./entities/pages/ChemotherapyPage"
import DiagnosisPage from "./entities/pages/DiagnosisPage"
import ProcedurePage from "./entities/pages/ProcedurePage"
import RadiotherapyPage from "./entities/pages/RadiotherapyPage"
import TreatmentPage from "./entities/pages/TreatmentPage"
import EntityPage from "./entityLists/EntityPage"
import AdverseEffects from "./pages/AdverseEffects"
import ErrorPage from "./pages/ErrorPage"
import Followup from "./pages/Followup"
import ForeignBodies from "./pages/ForeignBodies"
import Signature from "./pages/Signature"
import Help from "./pages/Help"

const getEntityPage = (entity: Entity | undefined): JSX.Element => {
    if (entity instanceof Diagnosis)
        return <EntityPage entity={entity} InnerComponent={DiagnosisPage} />
    if (entity instanceof Treatment)
        return <EntityPage entity={entity} InnerComponent={TreatmentPage} />
    if (entity instanceof Chemotherapy)
        return <EntityPage entity={entity} InnerComponent={ChemotherapyPage} />
    if (entity instanceof Radiotherapy)
        return <EntityPage entity={entity} InnerComponent={RadiotherapyPage} />
    if (entity instanceof Procedure)
        return <EntityPage entity={entity} InnerComponent={ProcedurePage} />
    if (entity instanceof CellTherapy)
        return <EntityPage entity={entity} InnerComponent={CellTherapyPage} />
    return <ErrorPage error={"Kohdetta ei löydy!"} />
}

const PageDisplay = observer(() => {
    const store = use(StoreContext)
    const Page: JSX.Element = useMemo(() => {
        switch (store.nav.page) {
            case 'help': return <Help />
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