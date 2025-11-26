import { Model, model, modelAction, prop } from 'mobx-keystone'

@model('catrest/Followup')
export class Followup extends Model({
    general: prop(''),
    vaccination: prop('')
}) {
    @modelAction
    set<K extends keyof this, V extends this[K]>(key: K, value: V) {
        this[key] = value
    }

    @modelAction
    clear() {
        this.general = ''
        this.vaccination = ''
    }
}