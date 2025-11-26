import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { NumberInputValue } from '../../types/numberInputValue.ts'
import type { SelectValue } from '../../types/selectValue.ts'
import { Entity } from './entity.ts'
import { computed } from 'mobx'
import { dataStoreContext } from '../../data/DataContext.ts'
import { calculateEquivalentDose } from '../../utils/calculateEquivalentDose.ts'

@model('catrest/Drug')
export class Drug extends ExtendedModel(Entity, {
    drug: prop(''),
    dose: prop<NumberInputValue>(0),
    doseFormula: prop<SelectValue>('mg/m²'),
    notes: prop('')
}) {
    @computed
    get doxoEquivalent(): number {
        const data = dataStoreContext.get(this)
        return calculateEquivalentDose(this, data.doxoEquivalents.drugs)
    }

    @computed
    get cycloEquivalent(): number {
        const data = dataStoreContext.get(this)
        return calculateEquivalentDose(this, data.cycloEquivalents.drugs)
    }
}