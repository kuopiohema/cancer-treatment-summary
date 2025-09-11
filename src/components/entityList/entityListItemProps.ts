import { RemoveCallback } from "../../types/listItems/listItemCallbacks"

export interface EntityListItemProps {
    index: number
    id: string
    onRemove: RemoveCallback
}