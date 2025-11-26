import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import { Entity } from './entity.ts'

@model('catrest/Procedure')
export class Procedure extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null),
    procedure: prop(''),
    details: prop(''),
    complications: prop('')
}) {}