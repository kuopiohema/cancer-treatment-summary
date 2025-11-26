import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import { Entity } from './entity.ts'

@model('catrest/Treatment')
export class Treatment extends ExtendedModel(Entity, {
    protocol: prop(''),
    group: prop(''),
    startDate: prop<DateInputValue>(null),
    endDate: prop<DateInputValue>(null),
    stopReason: prop('')
}) {}