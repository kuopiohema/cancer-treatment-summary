import { computed } from 'mobx'
import { arrayActions, Model, model, modelAction, prop } from 'mobx-keystone'
import type { Entity } from './entities/entity.ts'

@model('catrest/EntityList')
export class EntityList<E extends Entity> extends Model(<E>() => ({
    entities: prop<E[]>(() => [])
}))<E> {
    @modelAction
    add(entity: E) {
        arrayActions.push(this.entities, entity)
    }

    @modelAction
    swap(index1: number, index2: number) {
        arrayActions.swap(this.entities, index1, index2)
    }

    @modelAction
    remove(id: string) {
        const index = this.entities.findIndex(item => item.id === id)
        if (index === -1)
            return
        arrayActions.delete(this.entities, index)
    }

    @modelAction
    set(list: E[]) {
        this.entities = [...list]
    }

    @modelAction
    clear() {
        this.entities = []
    }

    @computed
    get entityCount() {
        return this.entities.length
    }
}