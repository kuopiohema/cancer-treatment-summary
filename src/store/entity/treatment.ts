import { observable, override } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDateRange } from '../../utils/formatDate'
import { Entity } from './entity'

export class Treatment extends Entity {
    @observable accessor protocol = ''
    @observable accessor group = ''
    @observable accessor startDate: DateInputValue = null
    @observable accessor endDate: DateInputValue = null
    @observable accessor stopReason = ''

    itemName = 'hoito'

    @override
    override get heading() {
        return this.protocol || '(Uusi hoito)'
    }

    @override
    override get content(): TextListItem[] {
        return [
            formatDateRange(this.startDate, this.endDate),
            { label: 'Hoitoryhmä', content: this.group },
            { label: 'Hoidon loppumisen syy', content: this.stopReason }
        ]
    }
}