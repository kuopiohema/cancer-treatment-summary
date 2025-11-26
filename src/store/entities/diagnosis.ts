import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import { Entity } from './entity.ts'

@model('catrest/Diagnosis')
export class Diagnosis extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null),
    icd10: prop(''),
    text: prop(''),
    detail: prop(''),
    stage: prop(''),
    spread: prop('')
}) {}