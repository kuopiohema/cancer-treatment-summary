import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import { Entity, EntityLabel } from './entity.ts'
import { override } from 'mobx'
import { formatDate } from '../../utils/formatDate.ts'

@model('catrest/Procedure')
export class Procedure extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null),
    procedure: prop(''),
    details: prop(''),
    complications: prop('')
}) {
    @override
    get label(): EntityLabel {
        return {
            heading: this.procedure || '(Uusi toimenpide)',
            content: [
                formatDate(this.date),
                this.details,
                { label: 'Komplikaatiot', content: this.complications }
            ]
        }
    }
}