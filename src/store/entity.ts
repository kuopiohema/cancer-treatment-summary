import { randomId } from "@mantine/hooks";
import { computed } from "mobx";
import { getRootStore, Model, model, modelAction, tProp, types } from "mobx-keystone";
import { ReactNode } from "react";
import { Path } from "../context/navContext";
import { Store } from "./store";

@model('catrest/entity')
export class Entity extends Model({
    id: tProp(types.string, () => randomId(''))
}) {
    itemName = 'kohde'
    path: Path = 'start'

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
        getRootStore<Store>(this)?.nav.selectEntity(this)
    }

    @computed
    get isSelected() {
        return getRootStore<Store>(this)?.nav.selectedEntity?.current?.id === this.id
    }
}