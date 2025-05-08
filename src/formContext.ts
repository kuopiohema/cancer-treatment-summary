import {createFormContext} from '@mantine/form'
import {randomId} from '@mantine/hooks'

export interface ArrayItem {
    id: string
}

const newArrayItem = (): ArrayItem => ({id: randomId()})

export interface Diagnosis extends ArrayItem {
    date: string | null
    icd10: string
    text: string
    detail: string
    stage: string
    spread: string
}

export const newDiagnosis = (): Diagnosis => ({
    ...newArrayItem(),
    date: null,
    icd10: '',
    text: '',
    detail: '',
    stage: '',
    spread: ''
})

export interface Chemo extends ArrayItem {
    drug: string
    dose: number
    doseType: string
    notes: string
}

export const newChemo = (): Chemo => ({
    ...newArrayItem(),
    drug: '',
    dose: 0,
    doseType: 'mgm2',
    notes: ''
})

export interface Treatment extends ArrayItem {
    protocol: string
    group: string
    startDate: string | null
    endDate: string | null
    stopReason: string
    stopReasonOther: string
    chemo: {
        done: boolean
        startDate: string | null
        endDate: string | null,
        drugs: Chemo[]
    }
}

export const newTreatment = (): Treatment => ({
    ...newArrayItem(),
    protocol: '',
    group: '',
    startDate: null,
    endDate: null,
    stopReason: 'completed',
    stopReasonOther: '',
    chemo: {
        done: false,
        startDate: null,
        endDate: null,
        drugs: []
    }
})

export interface FormValues {
    diagnoses: Diagnosis[]
    treatments: Treatment[]
}

export const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()