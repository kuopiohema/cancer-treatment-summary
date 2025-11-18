import { makeAutoObservable } from 'mobx'
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
    diagnoses = new NavEntityList<Diagnosis>()
    treatments = new NavEntityList<Treatment>()
    chemotherapies = new NavEntityList<Chemotherapy>()
    radiotherapies = new NavEntityList<Radiotherapy>()
    procedures = new NavEntityList<Procedure>()
    cellTherapies = new NavEntityList<CellTherapy>()
    foreignBodies = new NavEntityList<ForeignBody>()
    adverseEffects = new EntityList<AdverseEffect>()
    followup = new Followup()
    signature = new Signature()

    constructor() {
        makeAutoObservable(this)
    }

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

    toJSON() {
        return {
            diagnoses: 'diag'
        }
    }
}