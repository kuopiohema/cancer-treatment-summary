import { Divider, NavLink, Text } from "@mantine/core"
import { CellTherapy } from "../store/entity/cellTherapy"
import { Chemotherapy } from "../store/entity/chemotherapy"
import { Diagnosis } from "../store/entity/diagnosis"
import { Procedure } from "../store/entity/procedure"
import { Radiotherapy } from "../store/entity/radiotherapy"
import { Treatment } from "../store/entity/treatment"
import { buildTextList } from '../utils/buildTextList.tsx'
import NavList from "./entityLists/NavList"
import { use } from "react"
import { StoreContext } from "../store/StoreContext"
import { observer } from "mobx-react-lite"
import { countWithLabel } from "../utils/countWithLabel"

const Navbar = observer(() => {
    const { form, nav } = use(StoreContext)
    return (
        <>
            <NavList
                entityList={form.diagnoses}
                entityFactory={() => new Diagnosis()}
                title="Diagnoosit"
                emptyText="Ei diagnooseja"
                addButtonText="Lisää diagnoosi"
            />
            <NavList
                entityList={form.treatments}
                entityFactory={() => new Treatment()}
                title="Hoidot"
                emptyText="Ei hoitoja"
                addButtonText="Lisää hoito"
            />
            <NavList
                entityList={form.chemotherapies}
                entityFactory={() => new Chemotherapy()}
                title="Lääkehoitojaksot"
                emptyText="Ei lääkehoitojaksoja"
                addButtonText="Lisää lääkehoitojakso"
            />
            <NavList
                entityList={form.radiotherapies}
                entityFactory={() => new Radiotherapy()}
                title="Sädehoitojaksot"
                emptyText="Ei sädehoitojaksoja"
                addButtonText="Lisää sädehoitojakso"
            />
            <NavList
                entityList={form.procedures}
                entityFactory={() => new Procedure()}
                title="Leikkaukset ja toimenpiteet"
                emptyText="Ei toimenpiteitä"
                addButtonText="Lisää toimenpide"
            />
            <NavList
                entityList={form.cellTherapies}
                entityFactory={() => new CellTherapy()}
                title="Kantasolusiirrot ja muut soluhoidot"
                emptyText="Ei soluhoitoja"
                addButtonText="Lisää soluhoito"
            />
            <Divider mb="xs"/>
            <Divider />
            <NavLink
                label={<Text>Vierasesineet</Text>}
                description={countWithLabel(form.foreignBodies.entityCount, 'vierasesineitä', 'vierasesine', 'vierasesinettä')}
                active={nav.page === 'foreignBodies'}
                onClick={() => nav.selectPage('foreignBodies')}
            />
            <Divider />
            <NavLink
                label={<Text>Haittavaikutukset</Text>}
                description={countWithLabel(form.adverseEffects.entityCount, 'haittavaikutuksia', 'haittavaikutus', 'haittavaikutusta')}
                active={nav.page === 'adverseEffects'}
                onClick={() => nav.selectPage('adverseEffects')}
            />
            <Divider />
            <NavLink
                label={<Text>Jälkiseuranta</Text>}
                description={buildTextList(form.followup.content)}
                active={nav.page === 'followup'}
                onClick={() => nav.selectPage('followup')}
            />
            <Divider />
            <NavLink
                label={<Text>Lomakkeen täyttäjä</Text>}
                description={buildTextList(form.signature.content)}
                active={nav.page === 'signature'}
                onClick={() => nav.selectPage('signature')}
            />
        </>
    )
})

export default Navbar