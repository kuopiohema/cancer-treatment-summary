import { RemoveCallback } from "../../hooks/useEntityList"

export interface EntityListItemProps {
    itemName: string
    index: number
    id: string
    onRemove: RemoveCallback
}