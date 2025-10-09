import { createContext, model, Model, modelAction, prop, registerRootStore, Ref } from "mobx-keystone";
import { Data } from "./data";
import { Nav, navRef } from "./nav";

export const navCtx = createContext<Ref<Nav>>()

@model('catrest/Store')
export class Store extends Model({
    data: prop<Data>(() => new Data({})),
    nav: prop<Nav>(() => new Nav({})),
    navRef: prop<Ref<Nav> | undefined>(undefined)
}) {
    @modelAction
    clear() {
        this.data.clear()
        this.nav.reset()
    }

    onInit() {
        this.navRef = navRef(this.nav)
        navCtx.setComputed(this, () => this.navRef)
    }
}

export function createRootStore(): Store {
    const rootStore = new Store({})
    registerRootStore(rootStore)

    return rootStore
}