import { Entity } from "../../store/entity"
import { EntityList } from "../../store/entityList"

export interface EntityListProps<E extends Entity> {
    entityList: EntityList<E>
    entityFactory: () => E
    title: string
    emptyText: string
    addButtonText: string
}