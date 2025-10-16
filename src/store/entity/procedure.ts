import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { override } from "mobx";
import { getTextList } from "../../utils/getTextList";
import formatDate from "../../utils/formatDate";

@model('catrest/procedure')
export class Procedure extends ExtendedModel(Entity, {
    date: prop<string | null>(null).withSetter(),
    procedure: prop<string>('').withSetter(),
    details: prop<string>('').withSetter(),
    complications: prop<string>('').withSetter()
}) {
    itemName = 'toimenpide'

    @override
    get label() {
        return this.procedure || '(Uusi toimenpide)'
    }

    @override
    get sublabel() {
        return getTextList([
            formatDate(this.date),
            this.details,
            { heading: 'Komplikaatiot', content: this.complications }
        ])
    }
}