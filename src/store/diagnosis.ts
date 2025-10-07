import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";

@model('catrest/diagnosis')
export class Diagnosis extends ExtendedModel(Entity, {
    date: prop<string | null>(null).withSetter(),
    icd10: prop('').withSetter(),
    text: prop('').withSetter(),
    detail: prop('').withSetter(),
    stage: prop('').withSetter(),
    spread: prop('').withSetter()
}) {}