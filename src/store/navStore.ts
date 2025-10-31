import { model, Model, modelAction, prop, Ref } from "mobx-keystone";
import { rejectChangesConfirmModal } from "../modals/rejectChangesConfirmModal";
import { Entity, entityRef } from "./entity/entity";

export type Page = 'help' | 'entity' | 'foreignBodies' | 'adverseEffects' | 'followup' | 'signature'

@model('catrest/navStore')
export class NavStore extends Model({
    page: prop<Page>('help'),
    selectedEntity: prop<Ref<Entity> | undefined>(undefined),
    pageIsDirty: prop<boolean>(false).withSetter()
}) {
    @modelAction
    navigate(page: Page, entity?: Entity) {
        this.page = page
        if (page !== 'entity' || !entity)
            this.selectedEntity = undefined
        else
            this.selectedEntity = entityRef(entity)
    }

    tryNavigate(page: Page, entity?: Entity) {
        const action = () => this.navigate(page, entity)
        if (!this.pageIsDirty)
            action()
        else
            rejectChangesConfirmModal(action)
    }

    selectPage(page: Page) {
        this.tryNavigate(page)
    }

    selectEntity(entity: Entity) {
        this.tryNavigate('entity', entity)
    }

    @modelAction
    reset() {
        this.page = 'help'
        this.selectedEntity = undefined
        this.pageIsDirty = false
    }
}