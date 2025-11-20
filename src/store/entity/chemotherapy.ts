import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import { EntityList } from '../entityList'
import { Drug } from './drug'
import { Entity } from './entity'

export class Chemotherapy extends Entity {
    startDate: DateInputValue = null
    endDate: DateInputValue = null
    drugs: EntityList<Drug> = new EntityList<Drug>()

    constructor() {
        super()
        makeObservable(this, {
            startDate: observable,
            endDate: observable,
            drugs: observable
        })
    }

    itemName = 'kemoterapiajakso'
}