import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { DrugDosingTypeValue } from "../../data/drugDosingTypeOptions";
import { computed } from "mobx";
import { doxoEquivalents } from "../../data/doxoEquivalents";
import { NumberInputValue } from "../../types/numberInputValue";

@model('catrest/drug')
export class Drug extends ExtendedModel(Entity, {
    drug: prop('').withSetter(),
    dose: prop<NumberInputValue>(0).withSetter(),
    dosingType: prop<DrugDosingTypeValue>('').withSetter(),
    notes: prop('').withSetter()
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