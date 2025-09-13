import { ComponentType } from "react";
import { EntityList } from "../../hooks/useEntityList";
import { Entity } from "../../types/form/entity";
import { EntityListItemWrapperProps } from "./entityListItemWrapperProps";

export interface EntityListProps<E extends Entity> {
    list: EntityList<E>
    ItemComponent: ComponentType<EntityListItemWrapperProps<E>>
    title: string
    emptyText: string
    addButtonText: string
}