import { computed, makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import { NumberInputValue } from '../../types/numberInputValue'
import { SelectValue } from '../../types/selectValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDate, formatDateRange } from '../../utils/formatDate'
import { getDonorText } from '../../utils/getDonorText'
import { EntityList } from '../entityList'
import { Drug } from './drug'
import { Entity } from './entity'

export class CellTherapy extends Entity {
    date: DateInputValue = null
    origin: SelectValue = null
    type = ''
    carTarget = ''
    donor: SelectValue = null
    donorSex: SelectValue = null
    hlaMatch: SelectValue = null
    donorBloodGroup: SelectValue = null
    conditioning = ''
    drugs: EntityList<Drug> = new EntityList<Drug>()
    tbi = false
    tbiDoseBody: NumberInputValue = 0
    tbiDoseLungs: NumberInputValue = 0
    dli = false
    dliStartDate: DateInputValue = null
    dliEndDate: DateInputValue = null
    dliDoses: NumberInputValue = 0

    constructor() {
        super()
        makeObservable(this, {
            date: observable,
            origin: observable,
            type: observable,
            carTarget: observable,
            donor: observable,
            donorSex: observable,
            hlaMatch: observable,
            donorBloodGroup: observable,
            conditioning: observable,
            drugs: observable,
            tbi: observable,
            tbiDoseBody: observable,
            tbiDoseLungs: observable,
            dli: observable,
            dliStartDate: observable,
            dliEndDate: observable,
            dliDoses: observable,
            doxoEquivalent: computed,
            cycloEquivalent: computed
        })
    }

    itemName = 'soluhoito'

    override get heading() {
        return this.type || '(Uusi soluhoito)'
    }

    override get content(): TextListItem[] {
        return [
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

    get doxoEquivalent() {
        return this.drugs.entities.reduce((value, drug) => value + drug.doxoEquivalent, 0)
    }

    get cycloEquivalent() {
        return this.drugs.entities.reduce((value, drug) => value + drug.cycloEquivalent, 0)
    }
}