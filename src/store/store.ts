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

    @modelFlow
    *load(files: FileList | null) {
        if (!files)
            return

        if (files.length > 1)
            return

        const file = files[0]
        try {
            const contents = yield* _await(file.text())
            try { // try loading new format
                const snapshot = JSON.parse(contents) as SnapshotInOf<Store>
                this.clear()
                if (snapshot.diagnoses)
                    this.diagnoses = fromSnapshot<EntityList<Diagnosis>>(snapshot.diagnoses)
                if (snapshot.treatments)
                    this.treatments = fromSnapshot<EntityList<Treatment>>(snapshot.treatments)
                if (snapshot.chemotherapies)
                    this.chemotherapies = fromSnapshot<EntityList<Chemotherapy>>(snapshot.chemotherapies)
                if (snapshot.radiotherapies)
                    this.radiotherapies = fromSnapshot<EntityList<Radiotherapy>>(snapshot.radiotherapies)
                if (snapshot.procedures)
                    this.procedures = fromSnapshot<EntityList<Procedure>>(snapshot.procedures)
                if (snapshot.cellTherapies)
                    this.cellTherapies = fromSnapshot<EntityList<CellTherapy>>(snapshot.cellTherapies)
                if (snapshot.foreignBodies)
                    this.foreignBodies = fromSnapshot<EntityList<ForeignBody>>(snapshot.foreignBodies)
                if (snapshot.adverseEffects)
                    this.adverseEffects = fromSnapshot<EntityList<AdverseEffect>>(snapshot.adverseEffects)
                if (snapshot.followup)
                    this.followup = fromSnapshot<Followup>(snapshot.followup)
                if (snapshot.signature)
                    this.signature = fromSnapshot<Signature>(snapshot.signature)

                showNotification('', 'Tietojen lataaminen onnistui!', true)
            } catch {
                showNotification(
                    'Tietojen lataamisessa tapahtui virhe:',
                    'Tiedoston sisältöä ei tunnistettu'
                )
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