import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import { EntityList } from '../entityList.ts'
import type { Drug } from './drug.ts'
import { Entity } from './entity.ts'

@model('catrest/Chemotherapy')
export class Chemotherapy extends ExtendedModel(Entity, {
    startDate: prop<DateInputValue>(null),
    endDate: prop<DateInputValue>(null),
    drugs: prop<EntityList<Drug>>(() => new EntityList({}))
}) {}