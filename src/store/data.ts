import { model, Model, modelAction, prop } from "mobx-keystone";
import { Diagnosis } from "./diagnosis";
import { NavEntityList } from "./navEntityList";
import { Treatment } from "./treatment";

@model('catrest/Data')
export class Data extends Model({
    diagnoses: prop<NavEntityList<Diagnosis>>(() => new NavEntityList({})),
    treatments: prop<NavEntityList<Treatment>>(() => new NavEntityList({}))
}) {
    @modelAction
    clear() {
        this.diagnoses.clear()
        this.treatments.clear()
    }
}