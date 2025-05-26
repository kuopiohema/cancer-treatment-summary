import type { Drug } from './drug'
import { newListItem, type ListItem } from './listItem'

export interface Chemotherapy extends ListItem {
    startDate: string | null
    endDate: string | null
    drugs: Drug[]
}

export const newChemotherapy = (): Chemotherapy => ({
    ...newListItem(),
    startDate: null,
    endDate: null,
    drugs: []
})