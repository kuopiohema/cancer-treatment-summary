import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDateRange } from '../../utils/formatDate'
import { Entity } from './entity'

export class Treatment extends Entity {
    protocol = ''
    group = ''
    startDate: DateInputValue = null
    endDate: DateInputValue = null
    stopReason = ''

    constructor() {
        super()
        makeObservable(this, {
            protocol: observable,
            group: observable,
            startDate: observable,
            endDate: observable,
            stopReason: observable
        })
    }

    itemName = 'hoito'

    override get heading() {
        return this.protocol || '(Uusi hoito)'
    }

    override get content(): TextListItem[] {
        return [
            formatDateRange(this.startDate, this.endDate),
            { label: 'Hoitoryhmä', content: this.group },
            { label: 'Hoidon loppumisen syy', content: this.stopReason }
        ]
    }
}