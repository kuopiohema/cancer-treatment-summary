import { observable, override } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDate } from '../../utils/formatDate'
import { Entity } from './entity'

export class Procedure extends Entity {
    @observable accessor date: DateInputValue = null
    @observable accessor procedure = ''
    @observable accessor details = ''
    @observable accessor complications = ''

    itemName = 'toimenpide'

    @override
    override get heading() {
        return this.procedure || '(Uusi toimenpide)'
    }

    @override
    override get content(): TextListItem[] {
        return [
            formatDate(this.date),
            this.details,
            { label: 'Komplikaatiot', content: this.complications }
        ]
    }
}