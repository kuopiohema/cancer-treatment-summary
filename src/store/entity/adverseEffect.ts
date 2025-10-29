import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";

@model('catrest/adverseEffect')
export class AdverseEffect extends ExtendedModel(Entity, {
    organSystem: prop('').withSetter(),
    description: prop('').withSetter()
}) {
    itemName = 'haittavaikutus'
}