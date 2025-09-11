import { newEntity, type Entity } from './entity'

export interface Procedure extends Entity {
    date: string | null
    procedure: string
    details: string
    complications: string
}

export const newProcedure = (): Procedure => ({
    ...newEntity(),
    date: null,
    procedure: '',
    details: '',
    complications: ''
})