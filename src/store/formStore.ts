import { action, computed, observable } from 'mobx'
import { AdverseEffect } from './entity/adverseEffect'
import { CellTherapy } from './entity/cellTherapy'
import { Chemotherapy } from './entity/chemotherapy'
import { Diagnosis } from './entity/diagnosis'
import { ForeignBody } from './entity/foreignBody'
import { Procedure } from './entity/procedure'
import { Radiotherapy } from './entity/radiotherapy'
import { Treatment } from './entity/treatment'
import { EntityList } from './entityList'
import { Followup } from './followup'
import { NavEntityList } from './navEntityList'
import { Signature } from './signature'
import { nav } from './store.ts'

export class FormStore {
    @observable accessor diagnoses = new NavEntityList<Diagnosis>()
    @observable accessor treatments = new NavEntityList<Treatment>()
    @observable accessor chemotherapies = new NavEntityList<Chemotherapy>()
    @observable accessor radiotherapies = new NavEntityList<Radiotherapy>()
    @observable accessor procedures = new NavEntityList<Procedure>()
    @observable accessor cellTherapies = new NavEntityList<CellTherapy>()
    @observable accessor foreignBodies = new NavEntityList<ForeignBody>()
    @observable accessor adverseEffects = new EntityList<AdverseEffect>()
    @observable accessor followup = new Followup()
    @observable accessor signature = new Signature()

    @action
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

        nav.reset()
    }

    @action
    load(data: FormStore) {
        this.diagnoses = data.diagnoses
        this.treatments = data.treatments
        this.chemotherapies = data.chemotherapies
        this.radiotherapies = data.radiotherapies
        this.procedures = data.procedures
        this.cellTherapies = data.cellTherapies
        this.foreignBodies = data.foreignBodies
        this.adverseEffects = data.adverseEffects
        this.followup = data.followup
        this.signature = data.signature

        nav.reset()
    }

    @computed
    get asPlainObject() {
        return { diagnoses: [] }
    }
}