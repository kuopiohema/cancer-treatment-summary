import { override } from "mobx";
import { ExtendedModel, model, prop } from "mobx-keystone";
import formatDate from "../../utils/formatDate";
import { getDonorText } from "../../utils/getDonorText";
import { getTextList } from "../../utils/getTextList";
import { EntityList } from "../entityList";
import { Drug } from "./drug";
import { Entity } from "./entity";
import { NumberInputValue } from "../../types/numberInputValue";
import { DateInputValue } from "../../types/dateInputValue";
import { dataCtx } from "../store";
import { getOptionText } from "../../utils/getOptionText";
import { SelectValue } from "../../types/selectValue";

@model('catrest/stemCellTransplant')
export class StemCellTransplant extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null).withSetter(),
    type: prop<SelectValue>(null).withSetter(),
    donor: prop<SelectValue>(null).withSetter(),
    donorSex: prop<SelectValue>(null).withSetter(),
    hlaMatch: prop<SelectValue>(null).withSetter(),
    donorBloodGroup: prop<SelectValue>(null).withSetter(),
    conditioning: prop('').withSetter(),
    drugs: prop<EntityList<Drug>>(() => new EntityList({})),
    tbi: prop(false).withSetter(),
    tbiDoseBody: prop<NumberInputValue>(0).withSetter(),
    tbiDoseLungs: prop<NumberInputValue>(0).withSetter()
}) {
    itemName = 'kantasolusiirto'

    @override
    get label() {
        const data = dataCtx.get(this)
        return this.type ? `${data.stemCellTypeOptions[this.type]} siirto` : '(Uusi kantasolusiirto)'
    }

    @override
    get sublabel() {
        const data = dataCtx.get(this)
        return getTextList([
            formatDate(this.date),
            {
                heading: 'Luovuttaja',
                content: getDonorText(this.donor, this.donorSex, data.stemCellDonorOptions)
            },
            { heading: 'HLA-sopivuus', content: getOptionText(this.hlaMatch, data.hlaMatchOptions) },
            { heading: 'Luovuttajan veriryhmä', content: getOptionText(this.donorBloodGroup, data.bloodGroupOptions) },
            { heading: 'Esihoito', content: this.conditioning },
            { heading: 'TBI-annos', content: this.tbi ? `${this.tbiDoseBody} Gy (vartalo) / ${this.tbiDoseLungs} Gy (keuhkot)` : '' }
        ])
    }
}