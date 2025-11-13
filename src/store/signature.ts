import { action, computed, observable } from 'mobx'
import { DateInputValue } from '../types/dateInputValue'
import { type TextListItem } from '../utils/buildTextList'
import { formatDate } from '../utils/formatDate'

export class Signature {
    @observable accessor name = ''
    @observable accessor phone = ''
    @observable accessor place = ''
    @observable accessor date: DateInputValue = null

    @action
    clear() {
        this.name = ''
        this.phone = ''
        this.place = ''
        this.date = ''
    }

    @computed
    get content(): TextListItem[] {
        return [
            { label: 'Nimi', content: this.name || 'Ei syötetty' },
            { label: 'Puhelin', content: this.phone || 'Ei syötetty' },
            { label: 'Yksikkö', content: this.place || 'Ei syötetty' },
            { label: 'Päiväys', content: formatDate(this.date, 'Ei syötetty') }
        ]
    }
}