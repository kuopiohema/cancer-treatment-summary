import { model, Model, modelAction, prop, Ref } from "mobx-keystone";
import { Entity } from "./entity";
import { entityRef } from "./entityRef";

export type Page = 'start' | 'entity' | 'adverseEffects' | 'followup' | 'signature'

@model('catrest/Nav')
export class Nav extends Model({
    page: prop<Page>('start'),
    selectedEntity: prop<Ref<Entity> | undefined>(undefined)
}) {
    @modelAction
    selectPage(page: Page) {
        this.page = page
        if (page !== 'entity')
            this.selectedEntity = undefined
    }

    @modelAction
    selectEntity(entity: Entity) {
        this.page = 'entity'
        this.selectedEntity = entityRef(entity)
    }
}