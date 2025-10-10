import { override } from "mobx";
import { ExtendedModel, model, prop } from "mobx-keystone";
import formatDate from "../../utils/formatDate";
import { getTextList } from "../../utils/getTextList";
import { Entity } from "./entity";

@model('catrest/diagnosis')
export class Diagnosis extends ExtendedModel(Entity, {
    date: prop<string | null>(null).withSetter(),
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
        return getTextList([
            formatDate(this.date),
            this.detail,
            this.stage,
            this.spread
        ])
    }
}