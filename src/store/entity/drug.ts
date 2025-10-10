import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { DrugDosingTypeValue } from "../../data/drugDosingTypeOptions";
import { computed } from "mobx";
import { doxoEquivalents } from "../../data/doxoEquivalents";

@model('catrest/drug')
export class Drug extends ExtendedModel(Entity, {
    drug: prop<string>('').withSetter(),
    dose: prop<string | number>(0).withSetter(),
    dosingType: prop<DrugDosingTypeValue>('mgm2').withSetter(),
    notes: prop<string>('').withSetter()
}) {
    itemName = 'lääke'

    @computed
    get doxoEquivalent() {          
        const factor = doxoEquivalents.find((value) => value.drug === this.drug.toLocaleLowerCase())?.factor
        if (typeof this.dose === 'number' && factor)
            switch (this.dosingType) {
                case 'mgm2': return this.dose * factor
                case 'mgkg': return this.dose * 30 * factor
                default: return 0
            }
        else
            return 0
    }
}