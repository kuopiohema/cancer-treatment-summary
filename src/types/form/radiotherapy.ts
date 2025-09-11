import type { RadioModeValue } from '../../data/radioModeOptions'
import { newEntity, type Entity } from './entity'

export interface Radiotherapy extends Entity {
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
    ...newEntity(),
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