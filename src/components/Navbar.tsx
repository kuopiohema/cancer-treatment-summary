import { Divider, NavLink } from "@mantine/core"
import { CellTherapy } from "../store/entity/cellTherapy"
import { Chemotherapy } from "../store/entity/chemotherapy"
import { Diagnosis } from "../store/entity/diagnosis"
import { Procedure } from "../store/entity/procedure"
import { Radiotherapy } from "../store/entity/radiotherapy"
import { Treatment } from "../store/entity/treatment"
import NavList from "./entityLists/NavList"
import { use } from "react"
import { StoreContext } from "../store/StoreContext"
import { observer } from "mobx-react"
import { countWithLabel } from "../utils/countWithLabel"

const Navbar = observer(() => {
    const store = use(StoreContext)
    return (
        <>
            <NavList
                entityList={store.form.diagnoses}
                entityFactory={() => new Diagnosis({})}
                title="Diagnoosit"
                emptyText="Ei diagnooseja"
                addButtonText="Lisää diagnoosi"
            />
            <NavList
                entityList={store.form.treatments}
                entityFactory={() => new Treatment({})}
                title="Hoidot"
                emptyText="Ei hoitoja"
                addButtonText="Lisää hoito"
            />
            <NavList
                entityList={store.form.chemotherapies}
                entityFactory={() => new Chemotherapy({})}
                title="Lääkehoitojaksot"
                emptyText="Ei lääkehoitojaksoja"
                addButtonText="Lisää lääkehoitojakso"
            />
            <NavList
                entityList={store.form.radiotherapies}
                entityFactory={() => new Radiotherapy({})}
                title="Sädehoitojaksot"
                emptyText="Ei sädehoitojaksoja"
                addButtonText="Lisää sädehoitojakso"
            />
            <NavList
                entityList={store.form.procedures}
                entityFactory={() => new Procedure({})}
                title="Leikkaukset ja toimenpiteet"
                emptyText="Ei toimenpiteitä"
                addButtonText="Lisää toimenpide"
            />
            <NavList
                entityList={store.form.cellTherapies}
                entityFactory={() => new CellTherapy({})}
                title="Kantasolusiirrot ja muut soluhoidot"
                emptyText="Ei soluhoitoja"
                addButtonText="Lisää soluhoito"
            />
            <Divider />
            <NavLink
                label="Vierasesineet"
                description={countWithLabel(store.form.foreignBodies.entityCount, 'vierasesineitä', 'vierasesine', 'vierasesinettä')}
                active={store.nav.page === 'foreignBodies'}
                onClick={() => store.nav.selectPage('foreignBodies')}
            />
            <NavLink
                label="Haittavaikutukset"
                description={countWithLabel(store.form.adverseEffects.entityCount, 'haittavaikutuksia', 'haittavaikutus', 'haittavaikutusta')}
                active={store.nav.page === 'adverseEffects'}
                onClick={() => store.nav.selectPage('adverseEffects')}
            />
            <NavLink
                label="Jälkiseuranta"
                description={store.form.followup.sublabel}
                active={store.nav.page === 'followup'}
                onClick={() => store.nav.selectPage('followup')}
            />
            <NavLink
                label="Lomakkeen täyttäjä"
                description={store.form.signature.sublabel}
                active={store.nav.page === 'signature'}
                onClick={() => store.nav.selectPage('signature')}
            />
        </>
    )
})

export default Navbar