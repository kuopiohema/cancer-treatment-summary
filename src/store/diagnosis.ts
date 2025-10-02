import { arrayActions, ExtendedModel, Model, model, modelAction, tProp, types } from "mobx-keystone";
import { Entity } from "./entity";

@model('catrest/diagnosis')
export class Diagnosis extends ExtendedModel(Entity, {
    date: tProp(types.maybeNull(types.string), null).withSetter(),
    icd10: tProp(types.string, '').withSetter(),
    text: tProp(types.string, '').withSetter(),
    detail: tProp(types.string, '').withSetter(),
    stage: tProp(types.string, '').withSetter(),
    spread: tProp(types.string, '').withSetter()
}) {}

@model('catrest/diagnosisList')
export class DiagnosisList extends Model({
    entities: tProp(types.array(types.model(Diagnosis)), () => [])
}) {
    @modelAction
    add() {
        arrayActions.push(this.entities, new Diagnosis({}))
    }

    @modelAction
    swap(index1: number, index2: number) {
        arrayActions.swap(this.entities, index1, index2)
    }

    @modelAction
    remove(id: string) { 
        const index = this.entities.findIndex(item => item.id === id)
        if (index === -1)
            return
        arrayActions.delete(this.entities, index)
    }
}