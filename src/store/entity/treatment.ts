import { override } from 'mobx'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDateRange } from '../../utils/formatDate'
import { Entity } from './entity'

@model('catrest/treatment')
export class Treatment extends ExtendedModel(Entity, {
    protocol: prop('').withSetter(),
    group: prop('').withSetter(),
    startDate: prop<DateInputValue>(null).withSetter(),
    endDate: prop<DateInputValue>(null).withSetter(),
    stopReason: prop('').withSetter()
}) {
    itemName = 'hoito'

    @override
    get heading() {
        return this.protocol || '(Uusi hoito)'
    }

    @override
    get content(): TextListItem[] {
        return [
            formatDateRange(this.startDate, this.endDate),
            { label: 'Hoitoryhmä', content: this.group },
            { label: 'Hoidon loppumisen syy', content: this.stopReason }
        ]
    }
}