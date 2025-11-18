import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDate } from '../../utils/formatDate'
import { Entity } from './entity'

export class Procedure extends Entity {
    date: DateInputValue = null
    procedure = ''
    details = ''
    complications = ''

    constructor() {
        super()
        makeObservable(this, {
            date: observable,
            procedure: observable,
            details: observable,
            complications: observable
        })
    }

    itemName = 'toimenpide'

    override get heading() {
        return this.procedure || '(Uusi toimenpide)'
    }

    override get content(): TextListItem[] {
        return [
            formatDate(this.date),
            this.details,
            { label: 'Komplikaatiot', content: this.complications }
        ]
    }
}