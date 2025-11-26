import { Divider, NavLink, Text } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { use } from 'react'
import { NavContext } from '../nav/NavContext.ts'
import { CellTherapy } from '../store/entities/cellTherapy'
import { Chemotherapy } from '../store/entities/chemotherapy'
import { Diagnosis } from '../store/entities/diagnosis'
import { Procedure } from '../store/entities/procedure'
import { Radiotherapy } from '../store/entities/radiotherapy'
import { Treatment } from '../store/entities/treatment'
import { StoreContext } from '../store/StoreContext'
import { buildTextList } from '../utils/buildTextList.tsx'
import { countWithLabel } from '../utils/countWithLabel'
import { formatDate } from '../utils/formatDate.ts'
import NavList from './entityLists/NavList'

const Navbar = observer(() => {
    const store = use(StoreContext)
    const nav = use(NavContext)
    if (!nav)
        throw new Error('Navigation context missing!')

    const followup = store.followup
    const signature = store.signature

    return (
        <>
            <NavList
                entityList={store.diagnoses}
                entityFactory={() => new Diagnosis({})}
                title="Diagnoosit"
                emptyText="Ei diagnooseja"
                itemName="diagnoosi"
            />
            <NavList
                entityList={store.treatments}
                entityFactory={() => new Treatment({})}
                title="Hoidot"
                emptyText="Ei hoitoja"
                itemName="hoito"
            />
            <NavList
                entityList={store.chemotherapies}
                entityFactory={() => new Chemotherapy({})}
                title="Lääkehoitojaksot"
                emptyText="Ei lääkehoitojaksoja"
                itemName="lääkehoitojakso"
            />
            <NavList
                entityList={store.radiotherapies}
                entityFactory={() => new Radiotherapy({})}
                title="Sädehoitojaksot"
                emptyText="Ei sädehoitojaksoja"
                itemName="sädehoitojakso"
            />
            <NavList
                entityList={store.procedures}
                entityFactory={() => new Procedure({})}
                title="Leikkaukset ja toimenpiteet"
                emptyText="Ei toimenpiteitä"
                itemName="toimenpide"
            />
            <NavList
                entityList={store.cellTherapies}
                entityFactory={() => new CellTherapy({})}
                title="Kantasolusiirrot ja muut soluhoidot"
                emptyText="Ei soluhoitoja"
                itemName="soluhoito"
            />
            <Divider mb="xs" />
            <Divider />
            <NavLink
                label={<Text>Vierasesineet</Text>}
                description={countWithLabel(store.foreignBodies.entityCount, 'vierasesineitä', 'vierasesine', 'vierasesinettä')}
                active={nav.currentPage === 'foreignBodies'}
                onClick={() => nav.selectPage('foreignBodies')}
            />
            <Divider />
            <NavLink
                label={<Text>Haittavaikutukset</Text>}
                description={countWithLabel(store.adverseEffects.entityCount, 'haittavaikutuksia', 'haittavaikutus', 'haittavaikutusta')}
                active={nav.currentPage === 'adverseEffects'}
                onClick={() => nav.selectPage('adverseEffects')}
            />
            <Divider />
            <NavLink
                label={<Text>Jälkiseuranta</Text>}
                description={buildTextList([
                    { label: 'Yleisohjeet', content: followup.general ? 'Syötetty' : 'Ei syötetty' },
                    { label: 'Rokotusohjeet', content: followup.vaccination ? 'Syötetty' : 'Ei syötetty' }
                ])}
                active={nav.currentPage === 'followup'}
                onClick={() => nav.selectPage('followup')}
            />
            <Divider />
            <NavLink
                label={<Text>Lomakkeen täyttäjä</Text>}
                description={buildTextList([
                    { label: 'Nimi', content: signature.name || 'Ei syötetty' },
                    { label: 'Puhelin', content: signature.phone || 'Ei syötetty' },
                    { label: 'Paikka', content: signature.place || 'Ei syötetty' },
                    { label: 'Päiväys', content: formatDate(signature.date, 'Ei syötetty') }
                ])}
                active={nav.currentPage === 'signature'}
                onClick={() => nav.selectPage('signature')}
            />
        </>
    )
})

export default Navbar