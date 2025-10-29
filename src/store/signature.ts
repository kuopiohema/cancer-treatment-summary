import { Model, model, prop } from "mobx-keystone";
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
    @computed
    get sublabel() {
        return buildTextList([
            { heading: 'Nimi', content: this.name || 'Ei syötetty'},
            { heading: 'Puhelin', content: this.phone || 'Ei syötetty'},
            { heading: 'Yksikkö', content: this.place || 'Ei syötetty'},
            { heading: 'Päiväys', content: formatDate(this.date, 'Ei syötetty')}
        ])
    }
}