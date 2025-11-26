import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import type { NumberInputValue } from '../../types/numberInputValue.ts'
import { Entity } from './entity.ts'

@model('catrest/Radiotherapy')
export class Radiotherapy extends ExtendedModel(Entity, {
    startDate: prop<DateInputValue>(null),
    endDate: prop<DateInputValue>(null),
    target: prop(''),
    mode: prop(''),
    singleDose: prop<NumberInputValue>(0),
    totalDose: prop<NumberInputValue>(0),
    fractions: prop<NumberInputValue>(0),
    notes: prop('')
}) {}