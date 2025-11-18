import { randomId } from '@mantine/hooks'
import { action, computed, makeObservable } from 'mobx'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { nav } from '../store.ts'

export class Entity {
    id: string
    itemName = 'kohde'

    constructor() {
        this.id = randomId()
        makeObservable(this, {
            set: action,
            heading: computed,
            content: computed,
            select: action,
            isSelected: computed
        })
    }

    set<K extends keyof this, V extends this[K]>(key: K, value: V) {
        this[key] = value
    }

    get heading(): string {
        return this.id
    }

    get content(): TextListItem[] {
        return [this.id]
    }

    select() {
        nav.selectEntity(this)
    }

    get isSelected() {
        return nav.selectedEntity?.id === this.id
    }
}