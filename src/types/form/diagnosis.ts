import { newEntity, type Entity } from './entity'

export interface Diagnosis extends Entity {
    date: string | null
    icd10: string
    text: string
    detail: string
    stage: string
    spread: string
}

export const newDiagnosis = (): Diagnosis => ({
    ...newEntity(),
    date: null,
    icd10: '',
    text: '',
    detail: '',
    stage: '',
    spread: ''
})