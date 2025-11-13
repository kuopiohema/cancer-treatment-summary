import { action, observable } from 'mobx'
import { rejectChangesConfirmModal } from "../modals/rejectChangesConfirmModal";
import { Entity } from "./entity/entity";

export type Page = 'help' | 'entity' | 'foreignBodies' | 'adverseEffects' | 'followup' | 'signature'

export class NavStore {
    @observable accessor page: Page = 'help'
    @observable accessor selectedEntity: Entity | null = null
    @observable accessor pageIsDirty = false

    @action
    navigate(page: Page, entity?: Entity) {
        this.page = page
        if (page !== 'entity' || !entity)
            this.selectedEntity = null
        else
            this.selectedEntity = entity
    }

    @action
    tryNavigate(page: Page, entity?: Entity) {
        const action = () => this.navigate(page, entity)
        if (!this.pageIsDirty)
            action()
        else
            rejectChangesConfirmModal(action)
    }

    @action
    selectPage(page: Page) {
        this.tryNavigate(page)
    }

    @action
    selectEntity(entity: Entity) {
        this.tryNavigate('entity', entity)
    }

    @action
    reset() {
        this.page = 'help'
        this.selectedEntity = null
        this.pageIsDirty = false
    }
}