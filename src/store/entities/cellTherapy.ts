import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { DateInputValue } from '../../types/dateInputValue.ts'
import type { NumberInputValue } from '../../types/numberInputValue.ts'
import type { SelectValue } from '../../types/selectValue.ts'
import { EntityList } from '../entityList.ts'
import type { Drug } from './drug.ts'
import { Entity, EntityLabel } from './entity.ts'
import { computed, override } from 'mobx'
import { formatDate, formatDateRange } from '../../utils/formatDate.ts'
import { getDonorText } from '../../utils/getDonorText.ts'
import { calculateTotalEquivalentDose } from '../../utils/calculateEquivalentDose.ts'
import { doxoEquivalents } from '../../data/doxoEquivalents.ts'
import { cycloEquivalents } from '../../data/cycloEquivalents.ts'

@model('catrest/StemCellTransplant')
export class CellTherapy extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null),
    origin: prop<SelectValue>(null),
    type: prop(''),
    carTarget: prop(''),
    donor: prop<SelectValue>(null),
    donorSex: prop<SelectValue>(null),
    hlaMatch: prop<SelectValue>(null),
    donorBloodGroup: prop<SelectValue>(null),
    conditioning: prop(''),
    drugs: prop<EntityList<Drug>>(() => new EntityList({})),
    tbi: prop(false),
    tbiDoseBody: prop<NumberInputValue>(0),
    tbiDoseLungs: prop<NumberInputValue>(0),
    dli: prop(false),
    dliStartDate: prop<DateInputValue>(null),
    dliEndDate: prop<DateInputValue>(null),
    dliDoses: prop<NumberInputValue>(0)
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
            heading: this.type || '(Uusi soluhoito)',
            content: [
                this.origin ? `${this.origin} siirto` : '',
                { label: 'Siirtopäivä', content: formatDate(this.date) },
                { label: 'CAR-solujen kohde', content: this.carTarget },
                { label: 'Luovuttaja', content: getDonorText(this.donor, this.donorSex) },
                { label: 'HLA-sopivuus', content: this.hlaMatch },
                { label: 'Luovuttajan veriryhmä', content: this.donorBloodGroup },
                { label: 'Esihoito', content: this.conditioning },
                {
                    label: 'TBI',
                    content: this.tbi ? `${this.tbiDoseBody} Gy (vartalo) / ${this.tbiDoseLungs} Gy (keuhkot)` : ''
                },
                {
                    label: 'DLI',
                    content: this.dli ? `${formatDateRange(this.dliStartDate, this.dliEndDate)}, ${this.dliDoses} annosta` : ''
                }
            ]
        }
    }
}