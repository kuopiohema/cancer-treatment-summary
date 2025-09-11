import type { DrugDosingValue } from '../../data/drugDosingOptions'
import { newEntity, type Entity } from './entity'

export interface Drug extends Entity {
    drug: string
    dose: number
    dosingType: DrugDosingValue
    notes: string
}

export const newDrug = (): Drug => ({
    ...newEntity(),
    drug: '',
    dose: 0,
    dosingType: 'mgm2',
    notes: ''
})