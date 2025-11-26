import { ExtendedModel, model, prop } from 'mobx-keystone'
import { Entity } from './entity.ts'

@model('catrest/AdverseEffect')
export class AdverseEffect extends ExtendedModel(Entity, {
    organSystem: prop(''),
    description: prop('')
}) {}