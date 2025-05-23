import { newListItem, type ListItem } from './listItem'

export interface Procedure extends ListItem {
    date: string | null
    procedure: string
    details: string
    complications: string
}

export const newProcedure = (): Procedure => ({
    ...newListItem(),
    date: null,
    procedure: '',
    details: '',
    complications: ''
})