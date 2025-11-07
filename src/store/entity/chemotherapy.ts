import { computed, override } from 'mobx'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { DateInputValue } from '../../types/dateInputValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDateRange } from '../../utils/formatDate'
import { EntityList } from '../entityList'
import { Drug } from './drug'
import { Entity } from './entity'

@model('catrest/chemotherapy')
export class Chemotherapy extends ExtendedModel(Entity, {
    startDate: prop<DateInputValue>(null).withSetter(),
    endDate: prop<DateInputValue>(null).withSetter(),
    drugs: prop<EntityList<Drug>>(() => new EntityList({}))
}) {
    itemName = 'kemoterapiajakso'

    @override
    get heading() {
        return formatDateRange(this.startDate, this.endDate)
    }

    @override
    get content(): TextListItem[] {
        return [
            `${this.drugs.entities.length} lääke${this.drugs.entities.length !== 1 ? 'ttä' : ''}`,
            `Doksorubisiiniekvivalentti: ${this.doxoEquivalent} mg/m²`,
            `Syklofosfamidiekvivalentti: ${this.cycloEquivalent} mg/m²`
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