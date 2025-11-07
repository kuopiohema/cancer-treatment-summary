import { override } from 'mobx'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDate } from '../../utils/formatDate'
import { Entity } from './entity'

@model('catrest/diagnosis')
export class Diagnosis extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null).withSetter(),
    icd10: prop('').withSetter(),
    text: prop('').withSetter(),
    detail: prop('').withSetter(),
    stage: prop('').withSetter(),
    spread: prop('').withSetter()
}) {
    itemName = 'diagnoosi'

    @override
    get heading() {
        let result = this.icd10
        if (result)
            result += ' '
        result += this.text
        return result || '(Uusi diagnoosi)'
    }

    @override
    get content(): TextListItem[] {
        return [
            this.detail,
            { label: 'Todettu', content: formatDate(this.date) },
            { label: 'Stage', content: this.stage },
            { label: 'Levinneisyys', content: this.spread }
        ]
    }
}