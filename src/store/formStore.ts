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

@model('catrest/formStore')
export class FormStore extends Model({
    diagnoses: prop<NavEntityList<Diagnosis>>(() => new NavEntityList({})),
    treatments: prop<NavEntityList<Treatment>>(() => new NavEntityList({})),
    chemotherapies: prop<NavEntityList<Chemotherapy>>(() => new NavEntityList({})),
    radiotherapies: prop<NavEntityList<Radiotherapy>>(() => new NavEntityList({})),
    procedures: prop<NavEntityList<Procedure>>(() => new NavEntityList({})),
    cellTherapies: prop<NavEntityList<CellTherapy>>(() => new NavEntityList({})),
    foreignBodies: prop<EntityList<ForeignBody>>(() => new EntityList({}))
}) {
    @modelAction
    clear() {""
        this.diagnoses.clear()
        this.treatments.clear()
        this.chemotherapies.clear()
        this.radiotherapies.clear()
        this.procedures.clear()
        this.cellTherapies.clear()
        this.foreignBodies.clear()
    }
}