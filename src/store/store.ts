import { Model, model, modelAction, prop } from 'mobx-keystone'
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
}