import { override } from "mobx";
import { ExtendedModel, model, prop } from "mobx-keystone";
import formatDate from "../../utils/formatDate";
import { buildTextList } from "../../utils/buildTextList";
import { Entity } from "./entity";
import { DateInputValue } from "../../types/dateInputValue";

@model('catrest/diagnosis')
export class Diagnosis extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null).withSetter(),
    icd10: prop('').withSetter(),
    text: prop('').withSetter(),
    detail: prop('').withSetter(),
    stage: prop('').withSetter(),
    spread: prop('').withSetter()
}) {
    itemName = 'diagnoosi'

    @override
    get label() {
        let result = this.icd10
        if (result)
            result += ' '
        result += this.text
        return result || '(Uusi diagnoosi)'
    }

    @override
    get sublabel() {
        return buildTextList([
            formatDate(this.date),
            this.detail,
            this.stage,
            this.spread
        ])
    }
}