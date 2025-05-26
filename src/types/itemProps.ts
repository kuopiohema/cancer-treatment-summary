import type {ListItem} from '../form/listItem'

export interface ItemProps<T extends ListItem> {
    path: string
    index: number
    item: T
}