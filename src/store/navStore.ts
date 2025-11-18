import { action, makeObservable, observable } from "mobx";
import { rejectChangesConfirmModal } from "../modals/rejectChangesConfirmModal";
import { Entity } from "./entity/entity";

export type Page = 'help' | 'entity' | 'foreignBodies' | 'adverseEffects' | 'followup' | 'signature'

export class NavStore {
    page: Page = 'help'
    selectedEntity: Entity | null = null
    pageIsDirty = false

    constructor() {
        makeObservable(this, {
            page: observable,
            selectedEntity: observable,
            pageIsDirty: observable,
            setPageIsDirty: action,
            navigate: action,
            tryNavigate: action,
            selectPage: action,
            selectEntity: action,
            reset: action
        })
    }

    setPageIsDirty(value: boolean) { this.pageIsDirty = value }

    navigate(page: Page, entity?: Entity) {
        this.page = page
        if (page !== 'entity' || !entity)
            this.selectedEntity = null
        else
            this.selectedEntity = entity
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

    reset() {
        this.page = 'help'
        this.selectedEntity = null
        this.pageIsDirty = false
    }
}