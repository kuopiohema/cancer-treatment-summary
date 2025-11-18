import { Entity } from './entity/entity'
import { EntityList } from './entityList'
import { nav } from './store.ts'

export class NavEntityList<E extends Entity> extends EntityList<E> {
    override add(entity: E) {
        super.add(entity)
        if (!nav.pageIsDirty)
            nav.selectEntity(entity)
    }

    override remove(id: string) {
        const isCurrentEntity = nav.selectedEntity?.id === id
        super.remove(id)
        if (isCurrentEntity) {
            nav.setPageIsDirty(false)
            if (this.entities.length > 0)
                nav.selectEntity(this.entities[this.entities.length - 1])
            else
                nav.selectPage('help')
        }
    }
}