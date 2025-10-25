import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { SelectValue } from "../../types/selectValue";

@model('catrest/foreignBody')
export class ForeignBody extends ExtendedModel(Entity, {
    type: prop('').withSetter(),
    removal: prop<SelectValue>(null).withSetter()
}) {
    itemName = 'vierasesine'
}