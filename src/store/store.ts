import { model, Model, modelAction, prop, registerRootStore } from "mobx-keystone";
import { EntityList } from "./entityList";
import { Diagnosis } from "./diagnosis";

@model('catrest/Store')
export class Store extends Model({
    diagnoses: prop<EntityList<Diagnosis>>(() => new EntityList({}))
}) {
    @modelAction
    clear() {
        this.diagnoses.clear()
    }
}

export function createRootStore(): Store {
    const rootStore = new Store({})
    registerRootStore(rootStore)

    return rootStore
}