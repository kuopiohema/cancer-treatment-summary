import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { NumberInputValue } from '../../types/numberInputValue.ts'
import type { SelectValue } from '../../types/selectValue.ts'
import { Entity } from './entity.ts'

@model('catrest/drug')
export class Drug extends ExtendedModel(Entity, {
    drug: prop(''),
    dose: prop<NumberInputValue>(0),
    doseFormula: prop<SelectValue>('mg/m²'),
    notes: prop('')
}) {}