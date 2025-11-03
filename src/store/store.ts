import { createContext, model, Model, modelAction, prop, registerRootStore } from "mobx-keystone";
import { FormStore } from "./formStore";
import { NavStore } from "./navStore";
import { DataStore } from "./dataStore";

const formStore = new FormStore({})
const navStore = new NavStore({})
const dataStore = new DataStore({})

export const navCtx = createContext<NavStore>(navStore)
export const dataCtx = createContext<DataStore>(dataStore)

@model('catrest/store')
export class RootStore extends Model({
    form: prop<FormStore>(),
    nav: prop<NavStore>(),
    data: prop<DataStore>()
}) {
    @modelAction
    clear() {
        this.form.clear()
        this.nav.reset()
    }

    @modelAction
    load(data: FormStore) {
        this.clear()
        this.form = data
    }
}

export const rootStore = new RootStore({
    form: formStore,
    nav: navStore,
    data: dataStore
})
registerRootStore(rootStore)