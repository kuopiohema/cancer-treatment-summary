import { ExtendedModel, model, modelAction } from "mobx-keystone";
import { Entity } from "./entity";
import { EntityList } from "./entityList";
import { navCtx } from "./store";

@model('catrest/navEntityList')
export class NavEntityList<E extends Entity> extends ExtendedModel(EntityList, {}) {
    @modelAction
    add(entity: E) {
        super.add(entity)
        const nav = navCtx.get(this)?.current
        if (!nav?.pageIsDirty)
            nav?.selectEntity(entity)
    }

    @modelAction
    remove(id: string) {
        const nav = navCtx.get(this)?.current
        const isCurrentEntity = nav?.selectedEntity?.current?.id === id
        super.remove(id)
        if (isCurrentEntity) {
            nav?.setPageIsDirty(false)
            if (this.entities.length > 0)
                nav?.selectEntity(this.entities[this.entities.length - 1])
            else
                nav?.selectPage('start')
        }
    }
}