import { computed, observable, override } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDateRange } from '../../utils/formatDate'
import { EntityList } from '../entityList'
import { Drug } from './drug'
import { Entity } from './entity'

export class Chemotherapy extends Entity {
    @observable accessor startDate: DateInputValue = null
    @observable accessor endDate: DateInputValue = null
    @observable accessor drugs: EntityList<Drug> = new EntityList<Drug>()

    itemName = 'kemoterapiajakso'

    @override
    override get heading() {
        return formatDateRange(this.startDate, this.endDate)
    }

    @override
    override get content(): TextListItem[] {
        return [
            `${this.drugs.entities.length} lääke${this.drugs.entities.length !== 1 ? 'ttä' : ''}`,
            `Doksorubisiiniekvivalentti: ${this.doxoEquivalent} mg/m²`,
            //`Syklofosfamidiekvivalentti: ${this.cycloEquivalent} mg/m²`
        ]
    }

    @computed
    get doxoEquivalent() {
        return this.drugs.entities.reduce((value, drug) => value + drug.doxoEquivalent, 0)
    }

    @computed
    get cycloEquivalent() {
        return this.drugs.entities.reduce((value, drug) => value + drug.cycloEquivalent, 0)
    }
}