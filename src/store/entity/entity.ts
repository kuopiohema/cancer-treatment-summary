import { randomId } from '@mantine/hooks'
import { action, computed, makeObservable } from 'mobx'
import { nav } from '../store.ts'

export class Entity {
    id: string
    itemName = 'kohde'

    constructor() {
        this.id = randomId()
        makeObservable(this, {
            set: action,
            select: action,
            isSelected: computed
        })
    }

    set<K extends keyof this, V extends this[K]>(key: K, value: V) {
        this[key] = value
    }

    select() {
        nav.selectEntity(this)
    }

    get isSelected() {
        return nav.selectedEntity?.id === this.id
    }
}