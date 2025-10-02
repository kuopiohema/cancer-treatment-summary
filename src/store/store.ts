import { model, Model, registerRootStore, tProp, types } from "mobx-keystone";
import { DiagnosisList } from "./diagnosis";

@model('catrest/Store')
export class Store extends Model ({
    diagnoses: tProp(types.model(DiagnosisList), () => new DiagnosisList({})),
    test: tProp(types.number, 0).withSetter()
}) {}

export function createRootStore(): Store {
    const rootStore = new Store({})
    registerRootStore(rootStore)

    return rootStore
}