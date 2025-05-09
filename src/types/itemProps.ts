import type {ListItem} from '../formContext.ts'

export interface ItemProps<T extends ListItem> {
    path: string
    index: number
    item: T
}