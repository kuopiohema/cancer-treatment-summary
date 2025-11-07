import { override } from 'mobx'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { DateInputValue } from '../../types/dateInputValue'
import { NumberInputValue } from '../../types/numberInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDateRange } from '../../utils/formatDate'
import { Entity } from './entity'

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
    get heading() {
        return this.target || '(Uusi sädehoitojakso)'
    }

    @override
    get content(): TextListItem[] {
        return [
            formatDateRange(this.startDate, this.endDate),
            { label: 'Hoitomuoto', content: this.mode },
            { label: 'Annos', content: `${this.totalDose} Gy (${this.fractions} x ${this.singleDose} Gy)` },
            { label: 'Lisätiedot', content: this.notes }
        ]
    }
}