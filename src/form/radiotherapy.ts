import type { RadioModeValue } from '../data/radioModeOptions'
import { newListItem, type ListItem } from './listItem'

export interface Radiotherapy extends ListItem {
    startDate: string | null
    endDate: string | null
    target: string
    mode: RadioModeValue
    modeOther: string
    singleDose: number
    totalDose: number
    fractions: number
    notes: string
}

export const newRadiotherapy = (): Radiotherapy => ({
    ...newListItem(),
    startDate: null,
    endDate: null,
    target: '',
    mode: 'photon',
    modeOther: '',
    singleDose: 0,
    totalDose: 0,
    fractions: 0,
    notes: ''
})