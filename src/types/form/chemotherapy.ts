import type { Drug } from './drug'
import { newEntity, type Entity } from './entity'

export interface Chemotherapy extends Entity {
    startDate: string | null
    endDate: string | null
    drugs: Drug[]
}

export const newChemotherapy = (): Chemotherapy => ({
    ...newEntity(),
    startDate: null,
    endDate: null,
    drugs: []
})