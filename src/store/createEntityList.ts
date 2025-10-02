import { arrayActions, Model, model, modelAction, prop } from "mobx-keystone";
import { Entity } from "./entity";

@model("catrest/EntityList")
class EntityList<E extends Entity> extends Model(<E extends Entity>() => ({
    entities: prop<E[]>(() => [])
}))<E> {
    @modelAction
    add() {
        this.entities.push()
    }
}