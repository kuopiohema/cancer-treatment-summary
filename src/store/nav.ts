import { detach, model, Model, modelAction, prop, Ref, rootRef } from "mobx-keystone";
import { Entity, entityRef } from "./entity";
import { rejectChangesConfirmModal } from "../modals/rejectChangesConfirmModal";

export type Page = 'start' | 'entity' | 'adverseEffects' | 'followup' | 'signature'

@model('catrest/Nav')
export class Nav extends Model({
    page: prop<Page>('start'),
    selectedEntity: prop<Ref<Entity> | undefined>(undefined),
    pageIsDirty: prop<boolean>(false).withSetter()
}) {
    getRefId() {
        return 'nav'
    }

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
        this.page = 'start'
        this.selectedEntity = undefined
        this.pageIsDirty = false
    }
}

export const navRef = rootRef<Nav>("catrest/NavRef", {
    onResolvedValueChange(ref, newEntity, oldEntity) {
        if (oldEntity && !newEntity) {
            detach(ref)
        }
    }
})