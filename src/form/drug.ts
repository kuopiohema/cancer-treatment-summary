import type { DrugDosingValue } from '../data/drugDosingOptions'
import { newListItem, type ListItem } from './listItem'

export interface Drug extends ListItem {
    drug: string
    dose: number
    dosingType: DrugDosingValue
    notes: string
}

export const newChemo = (): Drug => ({
    ...newListItem(),
    drug: '',
    dose: 0,
    dosingType: 'mgm2',
    notes: ''
})