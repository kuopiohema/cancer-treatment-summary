import { Model, model, modelAction, prop } from 'mobx-keystone'
import type { DateInputValue } from '../types/dateInputValue.ts'

@model('catrest/Signature')
export class Signature extends Model({
    name: prop(''),
    phone: prop(''),
    place: prop(''),
    date: prop<DateInputValue>(null)
}) {
    @modelAction
    set<K extends keyof this, V extends this[K]>(key: K, value: V) {
        this[key] = value
    }

    @modelAction
    clear() {
        this.name = ''
        this.phone = ''
        this.place = ''
        this.date = ''
    }
}