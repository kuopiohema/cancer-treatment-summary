import { model, Model, modelAction, prop, registerRootStore } from "mobx-keystone";
import { Data } from "./data";
import { Nav } from "./nav";

@model('catrest/Store')
export class Store extends Model({
    data: prop<Data>(() => new Data({})),
    nav: prop<Nav>(() => new Nav({}))
}) {
    @modelAction
    clear() {
        this.data.clear()
        this.nav.selectPage('start')
    }
}

export function createRootStore(): Store {
    const rootStore = new Store({})
    registerRootStore(rootStore)

    return rootStore
}