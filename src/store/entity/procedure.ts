import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import { Entity } from './entity'

export class Procedure extends Entity {
    date: DateInputValue = null
    procedure = ''
    details = ''
    complications = ''

    constructor() {
        super()
        makeObservable(this, {
            date: observable,
            procedure: observable,
            details: observable,
            complications: observable
        })
    }

    itemName = 'toimenpide'
}