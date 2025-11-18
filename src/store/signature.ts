import { makeAutoObservable } from 'mobx'
import { DateInputValue } from '../types/dateInputValue'
import { type TextListItem } from '../utils/buildTextList'
import { formatDate } from '../utils/formatDate'

export class Signature {
    name = ''
    phone = ''
    place = ''
    date: DateInputValue = null

    constructor() {
        makeAutoObservable(this)
    }

    clear() {
        this.name = ''
        this.phone = ''
        this.place = ''
        this.date = ''
    }

    get content(): TextListItem[] {
        return [
            { label: 'Nimi', content: this.name || 'Ei syötetty' },
            { label: 'Puhelin', content: this.phone || 'Ei syötetty' },
            { label: 'Yksikkö', content: this.place || 'Ei syötetty' },
            { label: 'Päiväys', content: formatDate(this.date, 'Ei syötetty') }
        ]
    }
}