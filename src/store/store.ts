import { createContext, fromSnapshot, model, Model, modelAction, prop, registerRootStore, SnapshotInOf } from "mobx-keystone";
import { FormStore } from "./formStore";
import { NavStore } from "./navStore";
import { DataStore } from "./dataStore";
import { showNotification } from "../utils/showNotification";
import { OldFormStructure } from "../types/oldFormStructure";

const formStore = new FormStore({})
const navStore = new NavStore({})
const dataStore = new DataStore({})

export const navCtx = createContext<NavStore>(navStore)
export const dataCtx = createContext<DataStore>(dataStore)

const showLoadFailMessage = (message?: string) => showNotification(
    'Lataa tiedot',
    `Tiedoston lataaminen epäonnistui: ${message ?? 'Tuntematon virhe'}`,
    false
)

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
    load(files: FileList | null) {
        if (!files)
            return

        if (files.length > 1)
            return

        const file = files[0]

        const reader = new FileReader()
        reader.onerror = () => showLoadFailMessage(reader.error?.message)
        reader.onload = () => {
            if (typeof reader.result !== 'string') {
                showLoadFailMessage('Tiedoston sisältöä ei tunnistettu')
                return
            }

            try { // Try to load new format
                const snapshot = JSON.parse(reader.result) as SnapshotInOf<FormStore>
                const data = fromSnapshot<FormStore>(snapshot)

                this.clear()
                this.form = data

                showNotification(
                    'Lataa tiedot',
                    'Tietojen lataaminen onnistui!',
                    true
                )
            } catch {
                try { // Try to load old format
                    const data = JSON.parse(reader.result) as OldFormStructure

                    this.clear()
                    this.form.loadFromOldFile(data)

                    showNotification(
                        'Lataa tiedot',
                        'Tietojen lataaminen onnistui!',
                        true
                    )
                } catch {
                    showLoadFailMessage('Tiedoston sisältöä ei tunnistettu')
                }
            }
        }
        reader.readAsText(file)
    }
}

export const rootStore = new RootStore({
    form: formStore,
    nav: navStore,
    data: dataStore
})
registerRootStore(rootStore)