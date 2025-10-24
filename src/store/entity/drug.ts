import { computed } from "mobx";
import { ExtendedModel, model, prop } from "mobx-keystone";
import { NumberInputValue } from "../../types/numberInputValue";
import { dataCtx } from "../store";
import { Entity } from "./entity";
import { SelectValue } from "../../types/selectValue";

@model('catrest/drug')
export class Drug extends ExtendedModel(Entity, {
    drug: prop('').withSetter(),
    dose: prop<NumberInputValue>(0).withSetter(),
    doseFormula: prop<SelectValue>(null).withSetter(),
    notes: prop('').withSetter()
}) {
    itemName = 'lääke'

    @computed
    get doxoEquivalent() {
        const doxoEquivalents = dataCtx.get(this).doxoEquivalents
        const factor = doxoEquivalents.find((value) => value.drug === this.drug.toLocaleLowerCase())?.factor
        if (typeof this.dose === 'number' && factor) {
            switch (this.doseFormula) {
                case 'mgm2': return this.dose * factor
                case 'mgkg': return this.dose * 30 * factor
                default: return 0
            }
        }
        else
            return 0
    }
}