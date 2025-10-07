import { randomId } from "@mantine/hooks";
import { Model, model, modelAction, tProp, types } from "mobx-keystone";

@model('catrest/entity')
export class Entity extends Model({
    id: tProp(types.string, () => randomId(''))
}) {
    @modelAction
    set<K extends keyof this, V extends this[K]>(key: K, value: V) {
        this[key] = value
    }
}