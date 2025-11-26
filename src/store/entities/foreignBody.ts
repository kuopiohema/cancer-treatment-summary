import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { SelectValue } from '../../types/selectValue.ts'
import { Entity } from './entity.ts'

@model('catrest/ForeignBody')
export class ForeignBody extends ExtendedModel(Entity, {
    type: prop(''),
    removal: prop<SelectValue>(null)
}) {}