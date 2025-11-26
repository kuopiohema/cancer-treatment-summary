import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import type { NumberInputValue } from '../../types/numberInputValue.ts'
import { Entity, EntityLabel } from './entity.ts'
import { override } from 'mobx'
import { formatDateRange } from '../../utils/formatDate.ts'

@model('catrest/Radiotherapy')
export class Radiotherapy extends ExtendedModel(Entity, {
    startDate: prop<DateInputValue>(null),
    endDate: prop<DateInputValue>(null),
    target: prop(''),
    mode: prop(''),
    singleDose: prop<NumberInputValue>(0),
    totalDose: prop<NumberInputValue>(0),
    fractions: prop<NumberInputValue>(0),
    notes: prop('')
}) {
    @override
    get label(): EntityLabel {
        return {
            heading: this.target || '(Uusi sädehoitojakso)',
            content: [
                formatDateRange(this.startDate, this.endDate),
                { label: 'Hoitomuoto', content: this.mode },
                { label: 'Annos', content: `${this.totalDose} Gy (${this.fractions} x ${this.singleDose} Gy)` },
                { label: 'Lisätiedot', content: this.notes }
            ]
        }
    }
}