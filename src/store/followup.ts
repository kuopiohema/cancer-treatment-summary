import { makeAutoObservable } from 'mobx'
import { type TextListItem } from '../utils/buildTextList'

export class Followup {
    general = ''
    vaccination = ''

    constructor() {
        makeAutoObservable(this)
    }

    clear() {
        this.general = ''
        this.vaccination = ''
    }

    get content(): TextListItem[] {
        return [
            { label: 'Yleisohjeet', content: this.general ? 'Syötetty' : 'Ei syötetty' },
            { label: 'Rokotusohjeet', content: this.vaccination ? 'Syötetty' : 'Ei syötetty' }
        ]
    }
}