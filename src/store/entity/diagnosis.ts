import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDate } from '../../utils/formatDate'
import { Entity } from './entity'

export class Diagnosis extends Entity {
    date: DateInputValue = null
    icd10 = ''
    text = ''
    detail = ''
    stage = ''
    spread = ''

    constructor() {
        super()
        makeObservable(this, {
            date: observable,
            icd10: observable,
            text: observable,
            detail: observable,
            stage: observable,
            spread: observable
        })
    }

    itemName = 'diagnoosi'

    override get heading() {
        let result = this.icd10
        if (result)
            result += ' '
        result += this.text
        return result || '(Uusi diagnoosi)'
    }

    override get content(): TextListItem[] {
        return [
            this.detail,
            { label: 'Todettu', content: formatDate(this.date) },
            { label: 'Stage', content: this.stage },
            { label: 'Levinneisyys', content: this.spread }
        ]
    }
}