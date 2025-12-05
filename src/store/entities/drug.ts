import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { NumberInputValue } from '../../types/numberInputValue.ts'
import type { SelectValue } from '../../types/selectValue.ts'
import { Entity } from './entity.ts'
import { computed } from 'mobx'
import { calculateEquivalentDose } from '../../utils/calculateEquivalentDose.ts'
import { doseFormula } from '../../data/doseFormula.ts'
import { doxoEquivalents } from '../../data/doxoEquivalents.ts'
import { cycloEquivalents } from '../../data/cycloEquivalents.ts'

@model('catrest/Drug')
export class Drug extends ExtendedModel(Entity, {
    drug: prop(''),
    dose: prop<NumberInputValue>(0),
    doseFormula: prop<SelectValue>(doseFormula.mgm2),
    notes: prop('')
}) {
    @computed
    get doxoEquivalent(): number {
        return calculateEquivalentDose(this, doxoEquivalents.drugs)
    }

    @computed
    get cycloEquivalent(): number {
        return calculateEquivalentDose(this, cycloEquivalents.drugs)
    }
}