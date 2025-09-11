import { Entity } from "../../types/form/entity";
import { RemoveCallback } from "../../types/listItems/listItemCallbacks";

export interface EntityListItemWrapperProps<E extends Entity> {
    index: number
    item: E
    onRemove: RemoveCallback
}