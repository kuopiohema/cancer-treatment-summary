import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import { NumberInputValue } from '../../types/numberInputValue'
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
}