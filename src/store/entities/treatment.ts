import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import { Entity, EntityLabel } from './entity.ts'
import { override } from 'mobx'
import { formatDateRange } from '../../utils/formatDate.ts'

@model('catrest/Treatment')
export class Treatment extends ExtendedModel(Entity, {
    protocol: prop(''),
    group: prop(''),
    startDate: prop<DateInputValue>(null),
    endDate: prop<DateInputValue>(null),
    stopReason: prop('')
}) {
    @override
    get label(): EntityLabel {
        return {
            heading: this.protocol || '(Uusi hoito)',
            content: [
                formatDateRange(this.startDate, this.endDate),
                { label: 'Hoitoryhmä', content: this.group },
                { label: 'Hoidon loppumisen syy', content: this.stopReason }
            ]
        }
    }
}