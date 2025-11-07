import { Model, model, modelAction, prop } from "mobx-keystone";
import { DateInputValue } from "../types/dateInputValue";
import { computed } from "mobx";
import { buildTextList } from "../utils/buildTextList";
import { formatDate } from "../utils/formatDate";

@model('catrest/signature')
export class Signature extends Model({
    name: prop('').withSetter(),
    phone: prop('').withSetter(),
    place: prop('').withSetter(),
    date: prop<DateInputValue>(null).withSetter()
}) {
    @modelAction
    clear() {
        this.name = ''
        this.phone = ''
        this.place = ''
        this.date = ''
    }

    @computed
    get sublabel() {
        return buildTextList([
            { label: 'Nimi', content: this.name || 'Ei syötetty'},
            { label: 'Puhelin', content: this.phone || 'Ei syötetty'},
            { label: 'Yksikkö', content: this.place || 'Ei syötetty'},
            { label: 'Päiväys', content: formatDate(this.date, 'Ei syötetty')}
        ])
    }
}