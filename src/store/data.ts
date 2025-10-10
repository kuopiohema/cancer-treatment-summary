import { model, Model, modelAction, prop } from "mobx-keystone";
import { NavEntityList } from "./navEntityList";
import { Diagnosis } from "./entity/diagnosis";
import { Treatment } from "./entity/treatment";
import { Chemotherapy } from "./entity/chemotherapy";

@model('catrest/Data')
export class Data extends Model({
    diagnoses: prop<NavEntityList<Diagnosis>>(() => new NavEntityList({})),
    treatments: prop<NavEntityList<Treatment>>(() => new NavEntityList({})),
    chemotherapies: prop<NavEntityList<Chemotherapy>>(() => new NavEntityList({}))
}) {
    @modelAction
    clear() {
        this.diagnoses.clear()
        this.treatments.clear()
        this.chemotherapies.clear()
    }
}