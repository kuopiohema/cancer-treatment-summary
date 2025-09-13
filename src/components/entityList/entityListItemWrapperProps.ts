import { RemoveCallback } from "../../hooks/useEntityList";
import { Entity } from "../../types/form/entity";

export interface EntityListItemWrapperProps<E extends Entity> {
    index: number
    item: E
    onRemove: RemoveCallback
}