import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { DrugDosingTypeValue } from "../data/drugDosingTypeOptions";

@model('catrest/drug')
export class Drug extends ExtendedModel(Entity, {
    drug: prop<string>('').withSetter(),
    dose: prop<number>(0).withSetter(),
    dosingType: prop<DrugDosingTypeValue>('mgm2').withSetter(),
    notes: prop<string>('').withSetter()
}) {
    itemName = 'lääke'
}