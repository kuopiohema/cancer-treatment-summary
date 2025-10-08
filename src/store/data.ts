import { model, Model, modelAction, prop } from "mobx-keystone";
import { EntityList } from "./entityList";
import { Diagnosis } from "./diagnosis";
import { Treatment } from "./treatment";

@model('catrest/Data')
export class Data extends Model({
    diagnoses: prop<EntityList<Diagnosis>>(() => new EntityList({})),
    treatments: prop<EntityList<Treatment>>(() => new EntityList({}))
}) {
    @modelAction
    clear() {
        this.diagnoses.clear()
        this.treatments.clear()
    }
}