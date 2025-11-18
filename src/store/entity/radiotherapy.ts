import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import { NumberInputValue } from '../../types/numberInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDateRange } from '../../utils/formatDate'
import { Entity } from './entity'

export class Radiotherapy extends Entity {
    startDate: DateInputValue = null
    endDate: DateInputValue = null
    target = ''
    mode = ''
    singleDose: NumberInputValue = 0
    totalDose: NumberInputValue = 0
    fractions: NumberInputValue = 0
    notes = ''

    constructor() {
        super()
        makeObservable(this, {
            startDate: observable,
            endDate: observable,
            target: observable,
            mode: observable,
            singleDose: observable,
            totalDose: observable,
            fractions: observable,
            notes: observable
        })
    }

    itemName = 'sädehoitojakso'

    override get heading() {
        return this.target || '(Uusi sädehoitojakso)'
    }

    override get content(): TextListItem[] {
        return [
            formatDateRange(this.startDate, this.endDate),
            { label: 'Hoitomuoto', content: this.mode },
            { label: 'Annos', content: `${this.totalDose} Gy (${this.fractions} x ${this.singleDose} Gy)` },
            { label: 'Lisätiedot', content: this.notes }
        ]
    }
}