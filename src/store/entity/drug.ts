import { computed, observable } from 'mobx'
import { NumberInputValue } from "../../types/numberInputValue";
import { calculateEquivalentDose } from '../../utils/calculateEquivalentDose.ts'
import { data } from '../store'
import { Entity } from "./entity";
import { SelectValue } from "../../types/selectValue";

export class Drug extends Entity {
    @observable accessor drug = ''
    @observable accessor dose: NumberInputValue = 0
    @observable accessor doseFormula: SelectValue = 'mg/m²'
    @observable accessor notes = ''

    itemName = 'lääke'

    @computed
    get doxoEquivalent() {
        const doxoEquivalents = data.doxoEquivalents.drugs
        return calculateEquivalentDose(this, doxoEquivalents)
    }

    @computed
    get cycloEquivalent() {
        const cycloEquivalents = data.cycloEquivalents.drugs
        return calculateEquivalentDose(this, cycloEquivalents)
    }
}