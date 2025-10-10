import { randomId } from "@mantine/hooks";
import { computed } from "mobx";
import { detach, Model, model, modelAction, rootRef, tProp, types } from "mobx-keystone";
import { ReactNode } from "react";
import { navCtx } from "../store";

@model('catrest/entity')
export class Entity extends Model({
    id: tProp(types.string, () => randomId(''))
}) {
    itemName = 'kohde'

    getRefId() {
        return this.id
    }

    @modelAction
    set<K extends keyof this, V extends this[K]>(key: K, value: V) {
        this[key] = value
    }

    @computed
    get label(): ReactNode {
        return this.id
    }

    @computed
    get sublabel(): ReactNode {
        return this.id
    }

    @modelAction
    select() {
        navCtx.get(this)?.current?.selectEntity(this)
    }

    @computed
    get isSelected() {
        return navCtx.get(this)?.current?.selectedEntity?.current?.id === this.id
    }
}

export const entityRef = rootRef<Entity>("catrest/EntityRef", {
    onResolvedValueChange(ref, newEntity, oldEntity) {
        if (oldEntity && !newEntity) {
            detach(ref)
        }
    }
})