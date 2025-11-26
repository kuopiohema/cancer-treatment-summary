import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import type { NumberInputValue } from '../../types/numberInputValue.ts'
import type { SelectValue } from '../../types/selectValue.ts'
import { EntityList } from '../entityList.ts'
import type { Drug } from './drug.ts'
import { Entity } from './entity.ts'

@model('catrest/StemCellTransplant')
export class CellTherapy extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null),
    origin: prop<SelectValue>(null),
    type: prop(''),
    carTarget: prop(''),
    donor: prop<SelectValue>(null),
    donorSex: prop<SelectValue>(null),
    hlaMatch: prop<SelectValue>(null),
    donorBloodGroup: prop<SelectValue>(null),
    conditioning: prop(''),
    drugs: prop<EntityList<Drug>>(() => new EntityList({})),
    tbi: prop(false),
    tbiDoseBody: prop<NumberInputValue>(0),
    tbiDoseLungs: prop<NumberInputValue>(0),
    dli: prop(false),
    dliStartDate: prop<DateInputValue>(null),
    dliEndDate: prop<DateInputValue>(null),
    dliDoses: prop<NumberInputValue>(0)
}) {}