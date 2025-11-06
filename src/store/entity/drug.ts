import { computed } from "mobx";
import { ExtendedModel, model, prop } from "mobx-keystone";
import { NumberInputValue } from "../../types/numberInputValue";
import { calculateEquivalentDose } from '../../utils/calculateEquivalentDose.ts'
import { dataCtx } from "../store";
import { Entity } from "./entity";
import { SelectValue } from "../../types/selectValue";

@model('catrest/drug')
export class Drug extends ExtendedModel(Entity, {
    drug: prop('').withSetter(),
    dose: prop<NumberInputValue>(0).withSetter(),
    doseFormula: prop<SelectValue>('mg/m²').withSetter(),
    notes: prop('').withSetter()
}) {
    itemName = 'lääke'

    @computed
    get doxoEquivalent() {
        const doxoEquivalents = dataCtx.get(this).doxoEquivalents.drugs
        return calculateEquivalentDose(this, doxoEquivalents)
    }

    @computed
    get cycloEquivalent() {
        const cycloEquivalents = dataCtx.get(this).cycloEquivalents.drugs
        return calculateEquivalentDose(this, cycloEquivalents)
    }
}