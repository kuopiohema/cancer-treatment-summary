import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import { NumberInputValue } from '../../types/numberInputValue'
import { SelectValue } from '../../types/selectValue'
import { EntityList } from '../entityList'
import { Drug } from './drug'
import { Entity } from './entity'

export class CellTherapy extends Entity {
    date: DateInputValue = null
    origin: SelectValue = null
    type = ''
    carTarget = ''
    donor: SelectValue = null
    donorSex: SelectValue = null
    hlaMatch: SelectValue = null
    donorBloodGroup: SelectValue = null
    conditioning = ''
    drugs: EntityList<Drug> = new EntityList<Drug>()
    tbi = false
    tbiDoseBody: NumberInputValue = 0
    tbiDoseLungs: NumberInputValue = 0
    dli = false
    dliStartDate: DateInputValue = null
    dliEndDate: DateInputValue = null
    dliDoses: NumberInputValue = 0

    constructor() {
        super()
        makeObservable(this, {
            date: observable,
            origin: observable,
            type: observable,
            carTarget: observable,
            donor: observable,
            donorSex: observable,
            hlaMatch: observable,
            donorBloodGroup: observable,
            conditioning: observable,
            drugs: observable,
            tbi: observable,
            tbiDoseBody: observable,
            tbiDoseLungs: observable,
            dli: observable,
            dliStartDate: observable,
            dliEndDate: observable,
            dliDoses: observable
        })
    }

    itemName = 'soluhoito'
}