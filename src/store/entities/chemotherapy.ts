import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import { EntityList } from '../entityList.ts'
import type { Drug } from './drug.ts'
import { Entity, EntityLabel } from './entity.ts'
import { computed, override } from 'mobx'
import { formatDateRange } from '../../utils/formatDate.ts'
import { calculateTotalEquivalentDose } from '../../utils/calculateEquivalentDose.ts'
import { doxoEquivalents } from '../../data/doxoEquivalents.ts'
import { cycloEquivalents } from '../../data/cycloEquivalents.ts'

@model('catrest/Chemotherapy')
export class Chemotherapy extends ExtendedModel(Entity, {
    startDate: prop<DateInputValue>(null),
    endDate: prop<DateInputValue>(null),
    drugs: prop<EntityList<Drug>>(() => new EntityList({}))
}) {
    @computed
    get doxoEquivalent() {
        return calculateTotalEquivalentDose(this.drugs.entities, doxoEquivalents.drugs)
    }

    @computed
    get cycloEquivalent() {
        return calculateTotalEquivalentDose(this.drugs.entities, cycloEquivalents.drugs)
    }

    @override
    get label(): EntityLabel {        
        return {
            heading: formatDateRange(this.startDate, this.endDate),
            content: [
                `${this.drugs.entities.length} lääke${this.drugs.entities.length !== 1 ? 'ttä' : ''}`,
                `Doksorubisiiniekvivalentti: ${this.doxoEquivalent} mg/m²`
                //`Syklofosfamidiekvivalentti: ${this.cycloEquivalent} mg/m²`
            ]
        }
    }    
}