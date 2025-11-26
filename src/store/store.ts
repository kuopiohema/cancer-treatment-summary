import { _await, fromSnapshot, Model, model, modelAction, modelFlow, prop, SnapshotInOf } from 'mobx-keystone'
import { AdverseEffect } from './entities/adverseEffect.ts'
import { CellTherapy } from './entities/cellTherapy.ts'
import type { Chemotherapy } from './entities/chemotherapy.ts'
import type { Diagnosis } from './entities/diagnosis.ts'
import { ForeignBody } from './entities/foreignBody.ts'
import { Procedure } from './entities/procedure.ts'
import { Radiotherapy } from './entities/radiotherapy.ts'
import { Treatment } from './entities/treatment.ts'
import { EntityList } from './entityList.ts'
import { Followup } from './followup.ts'
import { Signature } from './signature.ts'
import { showNotification } from '../utils/showNotification.tsx'
import { loadOldVersionJson } from '../utils/loadOldVersionJson.ts'

@model('catrest/Store')
export class Store extends Model({
    diagnoses: prop<EntityList<Diagnosis>>(() => new EntityList({})),
    treatments: prop<EntityList<Treatment>>(() => new EntityList({})),
    chemotherapies: prop<EntityList<Chemotherapy>>(() => new EntityList({})),
    radiotherapies: prop<EntityList<Radiotherapy>>(() => new EntityList({})),
    procedures: prop<EntityList<Procedure>>(() => new EntityList({})),
    cellTherapies: prop<EntityList<CellTherapy>>(() => new EntityList({})),
    foreignBodies: prop<EntityList<ForeignBody>>(() => new EntityList({})),
    adverseEffects: prop<EntityList<AdverseEffect>>(() => new EntityList({})),
    followup: prop<Followup>(() => new Followup({})),
    signature: prop<Signature>(() => new Signature({}))
}) {
    @modelAction
    clear() {
        this.diagnoses.clear()
        this.treatments.clear()
        this.chemotherapies.clear()
        this.radiotherapies.clear()
        this.procedures.clear()
        this.cellTherapies.clear()
        this.foreignBodies.clear()
        this.adverseEffects.clear()
        this.followup.clear()
        this.signature.clear()
    }

    @modelAction
    restoreSnapshot(snapshot: SnapshotInOf<Store>) {
        if (!snapshot.diagnoses
            || !snapshot.treatments
            || !snapshot.chemotherapies
            || !snapshot.radiotherapies
            || !snapshot.procedures
            || !snapshot.cellTherapies
            || !snapshot.foreignBodies
            || !snapshot.adverseEffects
            || !snapshot.followup
            || !snapshot.signature        
        )
            throw new Error('Invalid snapshot loaded')
        this.clear()
        this.diagnoses = fromSnapshot<EntityList<Diagnosis>>(snapshot.diagnoses)
        this.treatments = fromSnapshot<EntityList<Treatment>>(snapshot.treatments)
        this.chemotherapies = fromSnapshot<EntityList<Chemotherapy>>(snapshot.chemotherapies)  
        this.radiotherapies = fromSnapshot<EntityList<Radiotherapy>>(snapshot.radiotherapies)
        this.procedures = fromSnapshot<EntityList<Procedure>>(snapshot.procedures)
        this.cellTherapies = fromSnapshot<EntityList<CellTherapy>>(snapshot.cellTherapies)
        this.foreignBodies = fromSnapshot<EntityList<ForeignBody>>(snapshot.foreignBodies)
        this.adverseEffects = fromSnapshot<EntityList<AdverseEffect>>(snapshot.adverseEffects)
        this.followup = fromSnapshot<Followup>(snapshot.followup)
        this.signature = fromSnapshot<Signature>(snapshot.signature)
    }

    @modelFlow
    *load(files: FileList | null) {
        if (!files)
            return

        if (files.length > 1)
            return

        const file = files[0]
        try {
            const json = yield* _await(file.text())
            try { // try loading new format
                const snapshot = JSON.parse(json) as SnapshotInOf<Store>
                this.restoreSnapshot(snapshot)
                showNotification('', 'Tietojen lataaminen onnistui!', true)
            } catch {
                try { // try loading old format
                    const snapshot = loadOldVersionJson(json)
                    this.restoreSnapshot(snapshot)
                    showNotification('', 'Tietojen lataaminen onnistui!', true)
                } catch {
                    showNotification(
                        'Tietojen lataamisessa tapahtui virhe:',
                        'Tiedoston sisältöä ei tunnistettu'
                    )
                }
            }
        } catch(e) {
            showNotification(
                'Tietojen lataamisessa tapahtui virhe:',
                typeof e === 'string' ? e :
                    e instanceof Error ? e.message :
                        'Tuntematon virhe'
            )
        }
    }
}