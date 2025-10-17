import { override } from "mobx";
import { ExtendedModel, model, prop } from "mobx-keystone";
import { bloodGroupOptions, BloodGroupValue } from "../../data/bloodGroupOptions";
import { getOptionText } from "../../data/dataUtils";
import { DonorValue } from "../../data/donorOptions";
import { hlaMatchOptions, HlaMatchValue } from "../../data/hlaMatchOptions";
import { sctOriginOptions, SctOriginValue } from "../../data/sctOriginOptions";
import { SexValue } from "../../data/sexOptions";
import formatDate from "../../utils/formatDate";
import { getDonorText } from "../../utils/getDonorText";
import { getTextList } from "../../utils/getTextList";
import { EntityList } from "../entityList";
import { Drug } from "./drug";
import { Entity } from "./entity";

@model('catrest/stemCellTransplant')
export class StemCellTransplant extends ExtendedModel(Entity, {
    date: prop<string | null>(null).withSetter(),
    type: prop<SctOriginValue>('').withSetter(),
    donor: prop<DonorValue>('').withSetter(),
    donorSex: prop<SexValue>('').withSetter(),
    hlaMatch: prop<HlaMatchValue>('').withSetter(),
    donorBloodGroup: prop<BloodGroupValue>('').withSetter(),
    conditioning: prop('').withSetter(),
    drugs: prop<EntityList<Drug>>(() => new EntityList({})),
    tbi: prop(false).withSetter(),
    tbiDoseBody: prop<string | number>(0).withSetter(),
    tbiDoseLungs: prop<string | number>(0).withSetter()
}) {
    itemName = 'kantasolusiirto'

    @override
    get label() {
        return this.type ? `${sctOriginOptions[this.type]} siirto` : '(Uusi kantasolusiirto)'
    }

    @override
    get sublabel() {
        return getTextList([
            formatDate(this.date),
            {
                heading: 'Luovuttaja',
                content: getDonorText(this.donor, this.donorSex)
            },
            { heading: 'HLA-sopivuus', content: getOptionText(this.hlaMatch, hlaMatchOptions) },
            { heading: 'Luovuttajan veriryhmä', content: getOptionText(this.donorBloodGroup, bloodGroupOptions) },
            { heading: 'Esihoito', content: this.conditioning },
            { heading: 'TBI-annos', content: this.tbi ? `${this.tbiDoseBody} Gy (vartalo) / ${this.tbiDoseLungs} Gy (keuhkot)` : '' }
        ])
    }
}