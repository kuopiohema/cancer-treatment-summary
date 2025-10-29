import { model, Model, modelAction, prop } from "mobx-keystone";
import { NavEntityList } from "./navEntityList";
import { Diagnosis } from "./entity/diagnosis";
import { Treatment } from "./entity/treatment";
import { Chemotherapy } from "./entity/chemotherapy";
import { Radiotherapy } from "./entity/radiotherapy";
import { Procedure } from "./entity/procedure";
import { CellTherapy } from "./entity/cellTherapy";
import { EntityList } from "./entityList";
import { ForeignBody } from "./entity/foreignBody";
import { AdverseEffect } from "./entity/adverseEffect";
import { Followup } from "./followup";
import { Signature } from "./signature";

@model('catrest/formStore')
export class FormStore extends Model({
    diagnoses: prop<NavEntityList<Diagnosis>>(() => new NavEntityList({})),
    treatments: prop<NavEntityList<Treatment>>(() => new NavEntityList({})),
    chemotherapies: prop<NavEntityList<Chemotherapy>>(() => new NavEntityList({})),
    radiotherapies: prop<NavEntityList<Radiotherapy>>(() => new NavEntityList({})),
    procedures: prop<NavEntityList<Procedure>>(() => new NavEntityList({})),
    cellTherapies: prop<NavEntityList<CellTherapy>>(() => new NavEntityList({})),
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
    }
}