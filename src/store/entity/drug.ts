import { computed, makeObservable, observable } from 'mobx'
import { NumberInputValue } from "../../types/numberInputValue";
import { calculateEquivalentDose } from '../../utils/calculateEquivalentDose.ts'
import { data } from '../store'
import { Entity } from "./entity";
import { SelectValue } from "../../types/selectValue";

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
            notes: observable,
            doxoEquivalent: computed,
            cycloEquivalent: computed
        })
    }

    itemName = 'lääke'

    get doxoEquivalent() {
        const doxoEquivalents = data.doxoEquivalents.drugs
        return calculateEquivalentDose(this, doxoEquivalents)
    }

    get cycloEquivalent() {
        const cycloEquivalents = data.cycloEquivalents.drugs
        return calculateEquivalentDose(this, cycloEquivalents)
    }
}