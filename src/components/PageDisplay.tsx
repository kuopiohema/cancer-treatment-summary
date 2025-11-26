import { observer } from 'mobx-react-lite'
import { use } from 'react'
import { NavContext } from '../nav/NavContext.ts'
import { CellTherapy } from '../store/entities/cellTherapy'
import { Chemotherapy } from '../store/entities/chemotherapy'
import { Diagnosis } from '../store/entities/diagnosis'
import { Entity } from '../store/entities/entity'
import { Procedure } from '../store/entities/procedure'
import { Radiotherapy } from '../store/entities/radiotherapy'
import { Treatment } from '../store/entities/treatment'
import CellTherapyPage from './entities/pages/CellTherapyPage'
import ChemotherapyPage from './entities/pages/ChemotherapyPage'
import DiagnosisPage from './entities/pages/DiagnosisPage'
import ProcedurePage from './entities/pages/ProcedurePage'
import RadiotherapyPage from './entities/pages/RadiotherapyPage'
import TreatmentPage from './entities/pages/TreatmentPage'
import EntityPageWrapper from './entityLists/EntityPageWrapper'
import AdverseEffects from './pages/AdverseEffects'
import ErrorPage from './pages/ErrorPage'
import Followup from './pages/Followup'
import ForeignBodies from './pages/ForeignBodies'
import Help from './pages/Help'
import Signature from './pages/Signature'

interface EntityPageProps<E extends Entity> {
    entity: E | undefined
}

const EntityPage = observer(<E extends Entity>({ entity }: EntityPageProps<E>) => {
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
    return <ErrorPage error={'Kohdetta ei löydy!'} />
})

const PageDisplay = () => {
    const nav = use(NavContext)
    if (!nav)
        throw new Error('Navigation context missing!')

    switch (nav.currentPage) {
        case 'help':
            return <Help />
        case 'foreignBodies':
            return <ForeignBodies />
        case 'adverseEffects':
            return <AdverseEffects />
        case 'followup':
            return <Followup />
        case 'signature':
            return <Signature />
        case 'entity':
            return <EntityPage entity={nav.currentEntity} />
        default:
            return <ErrorPage error="Sivua ei löydy!" />
    }
}

export default PageDisplay