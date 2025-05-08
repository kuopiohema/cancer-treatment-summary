import type {ArrayItem} from '../formContext.ts'

export interface ItemProps<T extends ArrayItem> {
    path: string
    index: number
    item: T
}