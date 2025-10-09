import { RemoveCallback } from "../../hooks/useEntityStore";
import { Entity } from "../../types/form/entity";

export interface NavListItemWrapperProps<E extends Entity> {
    index: number
    entity: E
    onRemove: RemoveCallback
}