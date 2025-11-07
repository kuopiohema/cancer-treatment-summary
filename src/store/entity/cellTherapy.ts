import { computed, override } from 'mobx'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { DateInputValue } from '../../types/dateInputValue'
import { NumberInputValue } from '../../types/numberInputValue'
import { SelectValue } from '../../types/selectValue'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { formatDate, formatDateRange } from '../../utils/formatDate'
import { getDonorText } from '../../utils/getDonorText'
import { EntityList } from '../entityList'
import { Drug } from './drug'
import { Entity } from './entity'

@model('catrest/stemCellTransplant')
export class CellTherapy extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null).withSetter(),
    origin: prop<SelectValue>(null).withSetter(),
    type: prop('').withSetter(),
    carTarget: prop('').withSetter(),
    donor: prop<SelectValue>(null).withSetter(),
    donorSex: prop<SelectValue>(null).withSetter(),
    hlaMatch: prop<SelectValue>(null).withSetter(),
    donorBloodGroup: prop<SelectValue>(null).withSetter(),
    conditioning: prop('').withSetter(),
    drugs: prop<EntityList<Drug>>(() => new EntityList({})),
    tbi: prop(false).withSetter(),
    tbiDoseBody: prop<NumberInputValue>(0).withSetter(),
    tbiDoseLungs: prop<NumberInputValue>(0).withSetter(),
    dli: prop(false).withSetter(),
    dliStartDate: prop<DateInputValue>(null).withSetter(),
    dliEndDate: prop<DateInputValue>(null).withSetter(),
    dliDoses: prop<NumberInputValue>(0).withSetter()
}) {
    itemName = 'soluhoito'

    @override
    get heading() {
        return this.type || '(Uusi soluhoito)'
    }

    @override
    get content(): TextListItem[] {
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