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
        if (factor && typeof this.dose === 'number') {
            if (this.doseFormula === 'mg/m²')
                return this.dose * factor
            if (this.doseFormula === 'mg/kg')
                return this.dose * 30 * factor
            return 0
        }
        else
            return 0
    }
}