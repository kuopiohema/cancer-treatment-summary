import { computed, makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDateRange } from '../../utils/formatDate'
import { EntityList } from '../entityList'
import { Drug } from './drug'
import { Entity } from './entity'

export class Chemotherapy extends Entity {
    startDate: DateInputValue = null
    endDate: DateInputValue = null
    drugs: EntityList<Drug> = new EntityList<Drug>()

    constructor() {
        super()
        makeObservable(this, {
            startDate: observable,
            endDate: observable,
            drugs: observable,
            doxoEquivalent: computed,
            cycloEquivalent: computed
        })
    }

    itemName = 'kemoterapiajakso'

    override get heading() {
        return formatDateRange(this.startDate, this.endDate)
    }

    override get content(): TextListItem[] {
        return [
            `${this.drugs.entities.length} lääke${this.drugs.entities.length !== 1 ? 'ttä' : ''}`,
            `Doksorubisiiniekvivalentti: ${this.doxoEquivalent} mg/m²`,
            //`Syklofosfamidiekvivalentti: ${this.cycloEquivalent} mg/m²`
        ]
    }

    get doxoEquivalent() {
        return this.drugs.entities.reduce((value, drug) => value + drug.doxoEquivalent, 0)
    }

    get cycloEquivalent() {
        return this.drugs.entities.reduce((value, drug) => value + drug.cycloEquivalent, 0)
    }
}