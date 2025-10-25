import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { override } from "mobx";
import { buildTextList } from "../../utils/buildTextList";
import { DateInputValue } from "../../types/dateInputValue";
import { NumberInputValue } from "../../types/numberInputValue";
import { formatDateRange } from "../../utils/formatDate";

@model('catrest/radiotherapy')
export class Radiotherapy extends ExtendedModel(Entity, {
    startDate: prop<DateInputValue>(null).withSetter(),
    endDate: prop<DateInputValue>(null).withSetter(),
    target: prop('').withSetter(),
    mode: prop('').withSetter(),
    singleDose: prop<NumberInputValue>(0).withSetter(),
    totalDose: prop<NumberInputValue>(0).withSetter(),
    fractions: prop<NumberInputValue>(0).withSetter(),
    notes: prop('').withSetter()
}) {
    itemName = 'sädehoitojakso'

    @override
    get label() {
        return this.target || '(Uusi sädehoitojakso)'
    }

    @override
    get sublabel() {
        return buildTextList([
            this.mode,
            formatDateRange(this.startDate, this.endDate),
            `${this.totalDose} Gy (${this.fractions} x ${this.singleDose} Gy)`,
            this.notes
        ])
    }
}