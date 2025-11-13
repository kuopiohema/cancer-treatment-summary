import { action, computed, observable } from 'mobx'
import { type TextListItem } from '../utils/buildTextList'

export class Followup {
    @observable accessor general = ''
    @observable accessor vaccination = ''

    @action
    clear() {
        this.general = ''
        this.vaccination = ''
    }

    @computed
    get content(): TextListItem[] {
        return [
            { label: 'Yleisohjeet', content: this.general ? 'Syötetty' : 'Ei syötetty' },
            { label: 'Rokotusohjeet', content: this.vaccination ? 'Syötetty' : 'Ei syötetty' }
        ]
    }
}