import { observer } from "mobx-react-lite"
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
import EntityPageWrapper from "./entityLists/EntityPageWrapper"
import AdverseEffects from "./pages/AdverseEffects"
import ErrorPage from "./pages/ErrorPage"
import Followup from "./pages/Followup"
import ForeignBodies from "./pages/ForeignBodies"
import Signature from "./pages/Signature"
import Help from "./pages/Help"

const getEntityPage = (entity: Entity | null): JSX.Element => {
    if (entity instanceof Diagnosis)
        return <EntityPageWrapper entity={entity} InnerComponent={DiagnosisPage} key={entity.id} />
    if (entity instanceof Treatment)
        return <EntityPageWrapper entity={entity} InnerComponent={TreatmentPage} key={entity.id} />
    if (entity instanceof Chemotherapy)
        return <EntityPageWrapper entity={entity} InnerComponent={ChemotherapyPage} key={entity.id} />
    if (entity instanceof Radiotherapy)
        return <EntityPageWrapper entity={entity} InnerComponent={RadiotherapyPage} key={entity.id} />
    if (entity instanceof Procedure)
        return <EntityPageWrapper entity={entity} InnerComponent={ProcedurePage} key={entity.id} />
    if (entity instanceof CellTherapy)
        return <EntityPageWrapper entity={entity} InnerComponent={CellTherapyPage} key={entity.id} />
    return <ErrorPage error={"Kohdetta ei löydy!"} />
}

const PageDisplay = observer(() => {
    const { nav } = use(StoreContext)
    const Page: JSX.Element = useMemo(() => {
        switch (nav.page) {
            case 'help': return <Help />
            case 'foreignBodies': return <ForeignBodies />
            case 'adverseEffects': return <AdverseEffects />
            case 'followup': return <Followup />
            case 'signature': return <Signature />
            case 'entity': return getEntityPage(nav.selectedEntity)
            default: return <ErrorPage error="Sivua ei löydy!" />
        }
    }, [nav.page, nav.selectedEntity])
    return Page
})

export default PageDisplay