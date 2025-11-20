import { makeObservable, observable } from 'mobx'
import { NumberInputValue } from '../../types/numberInputValue'
import { SelectValue } from '../../types/selectValue'
import { Entity } from './entity'

export class Drug extends Entity {
    drug = ''
    dose: NumberInputValue = 0
    doseFormula: SelectValue = 'mg/m²'
    notes = ''

    constructor() {
        super()
        makeObservable(this, {
            drug: observable,
            dose: observable,
            doseFormula: observable,
            notes: observable
        })
    }

    itemName = 'lääke'
}