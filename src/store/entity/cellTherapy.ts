import { override } from "mobx";
import { ExtendedModel, model, prop } from "mobx-keystone";
import formatDate from "../../utils/formatDate";
import { getDonorText } from "../../utils/getDonorText";
import { buildTextList } from "../../utils/buildTextList";
import { EntityList } from "../entityList";
import { Drug } from "./drug";
import { Entity } from "./entity";
import { NumberInputValue } from "../../types/numberInputValue";
import { DateInputValue } from "../../types/dateInputValue";
import { SelectValue } from "../../types/selectValue";

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
    tbiDoseLungs: prop<NumberInputValue>(0).withSetter()
}) {
    itemName = 'soluhoito'

    @override
    get label() {
        const result = this.type || '(Uusi soluhoito)'
        if (this.origin)
            return `${result} (${this.origin})`
        return result
    }

    @override
    get sublabel() {
        return buildTextList([
            { heading: 'CAR-solujen kohde', content: this.carTarget},
            formatDate(this.date),
            {
                heading: 'Luovuttaja',
                content: getDonorText(this.donor, this.donorSex)
            },
            { heading: 'HLA-sopivuus', content: this.hlaMatch },
            { heading: 'Luovuttajan veriryhmä', content: this.donorBloodGroup },
            { heading: 'Esihoito', content: this.conditioning },
            { heading: 'TBI-annos', content: this.tbi ? `${this.tbiDoseBody} Gy (vartalo) / ${this.tbiDoseLungs} Gy (keuhkot)` : '' },
        ])
    }
}