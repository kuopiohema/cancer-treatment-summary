import { observable, override } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import { NumberInputValue } from '../../types/numberInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDateRange } from '../../utils/formatDate'
import { Entity } from './entity'

export class Radiotherapy extends Entity {
    @observable accessor startDate: DateInputValue = null
    @observable accessor endDate: DateInputValue = null
    @observable accessor target = ''
    @observable accessor mode = ''
    @observable accessor singleDose: NumberInputValue = 0
    @observable accessor totalDose: NumberInputValue = 0
    @observable accessor fractions: NumberInputValue = 0
    @observable accessor notes = ''

    itemName = 'sädehoitojakso'

    @override
    override get heading() {
        return this.target || '(Uusi sädehoitojakso)'
    }

    @override
    override get content(): TextListItem[] {
        return [
            formatDateRange(this.startDate, this.endDate),
            { label: 'Hoitomuoto', content: this.mode },
            { label: 'Annos', content: `${this.totalDose} Gy (${this.fractions} x ${this.singleDose} Gy)` },
            { label: 'Lisätiedot', content: this.notes }
        ]
    }
}