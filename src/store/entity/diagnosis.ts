import { observable, override } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDate } from '../../utils/formatDate'
import { Entity } from './entity'

export class Diagnosis extends Entity {
    @observable accessor date: DateInputValue = null
    @observable accessor icd10 = ''
    @observable accessor text = ''
    @observable accessor detail = ''
    @observable accessor stage = ''
    @observable accessor spread = ''

    itemName = 'diagnoosi'

    @override
    override get heading() {
        let result = this.icd10
        if (result)
            result += ' '
        result += this.text
        return result || '(Uusi diagnoosi)'
    }

    @override
    override get content(): TextListItem[] {
        return [
            this.detail,
            { label: 'Todettu', content: formatDate(this.date) },
            { label: 'Stage', content: this.stage },
            { label: 'Levinneisyys', content: this.spread }
        ]
    }
}