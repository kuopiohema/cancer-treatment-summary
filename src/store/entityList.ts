import { Entity } from "./entity/entity";
import { action, computed, observable } from 'mobx'

export class EntityList<E extends Entity> {
    @observable accessor entities: E[] = []

    @action
    add(entity: E) {
        this.entities.push(entity)
    }

    @action
    swap(firstIndex: number, secondIndex: number) {
        [this.entities[firstIndex], this.entities[secondIndex]] = [this.entities[secondIndex], this.entities[firstIndex]]
    }

    @action
    remove(id: string) {
        const index = this.entities.findIndex(item => item.id === id)
        if (index === -1)
            return
        this.entities.splice(index, 1)
    }

    @action
    clear() {
        this.entities = []
    }

    @computed
    get entityCount() {
        return this.entities.length
    }
}