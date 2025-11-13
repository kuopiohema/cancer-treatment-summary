import { randomId } from '@mantine/hooks'
import { action, computed } from 'mobx'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { nav } from '../store.ts'

export class Entity {
    id: string
    itemName = 'kohde'

    constructor() {
        this.id = randomId()
    }

    @action
    set<K extends keyof this, V extends this[K]>(key: K, value: V) {
        this[key] = value
    }

    @computed
    get heading(): string {
        return this.id
    }

    @computed
    get content(): TextListItem[] {
        return [this.id]
    }

    @action
    select() {
        nav.selectEntity(this)
    }

    @computed
    get isSelected() {
        return nav.selectedEntity?.id === this.id
    }
}