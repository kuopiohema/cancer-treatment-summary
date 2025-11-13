import { computed, observable, override } from 'mobx'
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
    @observable accessor date: DateInputValue = null
    @observable accessor origin: SelectValue = null
    @observable accessor type = ''
    @observable accessor carTarget = ''
    @observable accessor donor: SelectValue = null
    @observable accessor donorSex: SelectValue = null
    @observable accessor hlaMatch: SelectValue = null
    @observable accessor donorBloodGroup: SelectValue = null
    @observable accessor conditioning = ''
    @observable accessor drugs: EntityList<Drug> = new EntityList<Drug>()
    @observable accessor tbi = false
    @observable accessor tbiDoseBody: NumberInputValue = 0
    @observable accessor tbiDoseLungs: NumberInputValue = 0
    @observable accessor dli = false
    @observable accessor dliStartDate: DateInputValue = null
    @observable accessor dliEndDate: DateInputValue = null
    @observable accessor dliDoses: NumberInputValue = 0

    itemName = 'soluhoito'

    @override
    override get heading() {
        return this.type || '(Uusi soluhoito)'
    }

    @override
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

    @computed
    get doxoEquivalent() {
        return this.drugs.entities.reduce((value, drug) => value + drug.doxoEquivalent, 0)
    }

    @computed
    get cycloEquivalent() {
        return this.drugs.entities.reduce((value, drug) => value + drug.cycloEquivalent, 0)
    }
}