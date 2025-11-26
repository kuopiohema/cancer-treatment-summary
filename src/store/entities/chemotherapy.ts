import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import { EntityList } from '../entityList.ts'
import type { Drug } from './drug.ts'
import { Entity, EntityLabel } from './entity.ts'
import { override } from 'mobx'
import { formatDateRange } from '../../utils/formatDate.ts'
import { calculateTotalEquivalentDose } from '../../utils/calculateEquivalentDose.ts'
import { dataStoreContext } from '../../data/DataContext.ts'

@model('catrest/Chemotherapy')
export class Chemotherapy extends ExtendedModel(Entity, {
    startDate: prop<DateInputValue>(null),
    endDate: prop<DateInputValue>(null),
    drugs: prop<EntityList<Drug>>(() => new EntityList({}))
}) {
    @override
    get label(): EntityLabel {
        const data = dataStoreContext.get(this)

        const doxoEquivalent = data ? calculateTotalEquivalentDose(this.drugs.entities, data.doxoEquivalents.drugs) : '(Ei voitu laskea)'
        // const cycloEquivalent = calculateTotalEquivalentDose(entity.drugs.entities, data.cycloEquivalents.drugs)
        
        return {
            heading: formatDateRange(this.startDate, this.endDate),
            content: [
                `${this.drugs.entities.length} lääke${this.drugs.entities.length !== 1 ? 'ttä' : ''}`,
                `Doksorubisiiniekvivalentti: ${doxoEquivalent} mg/m²`
                //`Syklofosfamidiekvivalentti: ${this.cycloEquivalent} mg/m²`
            ]
        }
    }    
}