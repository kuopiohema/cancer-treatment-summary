import { newListItem, type ListItem } from './listItem'

export interface Diagnosis extends ListItem {
    date: string | null
    icd10: string
    text: string
    detail: string
    stage: string
    spread: string
}

export const newDiagnosis = (): Diagnosis => ({
    ...newListItem(),
    date: null,
    icd10: '',
    text: '',
    detail: '',
    stage: '',
    spread: ''
})