import { ComponentType } from "react";
import { Entity } from "../../types/form/entity";
import { EntityListItemWrapperProps } from "./entityListItemWrapperProps";
import { AddCallback, RemoveCallback, SwapCallback, UpdateCallback } from "../../types/listItems/listItemCallbacks";

export interface EntityListProps<E extends Entity> {
    items: E[]
    ItemComponent: ComponentType<EntityListItemWrapperProps<E>>
    onAdd: AddCallback
    onUpdate: UpdateCallback<E>
    onSwap: SwapCallback
    onRemove: RemoveCallback
    title: string
    emptyText: string
    addButtonText: string
}