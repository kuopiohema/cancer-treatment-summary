import { override } from 'mobx'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDate } from '../../utils/formatDate'
import { Entity } from './entity'

@model('catrest/procedure')
export class Procedure extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null).withSetter(),
    procedure: prop('').withSetter(),
    details: prop('').withSetter(),
    complications: prop('').withSetter()
}) {
    itemName = 'toimenpide'

    @override
    get heading() {
        return this.procedure || '(Uusi toimenpide)'
    }

    @override
    get content(): TextListItem[] {
        return [
            formatDate(this.date),
            this.details,
            { label: 'Komplikaatiot', content: this.complications }
        ]
    }
}