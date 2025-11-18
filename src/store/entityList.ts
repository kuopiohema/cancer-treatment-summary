import { Entity } from "./entity/entity";
import { action, computed, makeObservable, observable } from 'mobx'

export class EntityList<E extends Entity> {
    entities: E[] = []

    constructor() {
        makeObservable(this, {
            entities: observable,
            add: action,
            swap: action,
            remove: action,
            clear: action,
            entityCount: computed
        })
    }

    add(entity: E) {
        this.entities.push(entity)
    }

    swap(firstIndex: number, secondIndex: number) {
        [this.entities[firstIndex], this.entities[secondIndex]] = [this.entities[secondIndex], this.entities[firstIndex]]
    }

    remove(id: string) {
        const index = this.entities.findIndex(item => item.id === id)
        if (index === -1)
            return
        this.entities.splice(index, 1)
    }

    clear() {
        this.entities = []
    }

    get entityCount() {
        return this.entities.length
    }
}