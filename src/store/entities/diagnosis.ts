import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import { Entity, EntityLabel } from './entity.ts'
import { override } from 'mobx'
import { formatDate } from '../../utils/formatDate.ts'

@model('catrest/Diagnosis')
export class Diagnosis extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null),
    icd10: prop(''),
    text: prop(''),
    detail: prop(''),
    stage: prop(''),
    spread: prop('')
}) {
    @override
    get label(): EntityLabel {
        let heading = this.icd10
        if (heading)
            heading += ' '
        heading += this.text
        return {
            heading: heading || '(Uusi diagnoosi)',
            content: [
                this.detail,
                { label: 'Todettu', content: formatDate(this.date) },
                { label: 'Stage', content: this.stage },
                { label: 'Levinneisyys', content: this.spread }
            ]
        }
    }
}