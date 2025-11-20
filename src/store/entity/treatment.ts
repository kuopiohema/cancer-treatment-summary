import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
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
}