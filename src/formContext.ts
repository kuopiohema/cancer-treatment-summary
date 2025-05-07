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
    subtype: string
    stage: string
    spread: string
}

export const newDiagnosis = (): Diagnosis => ({
    ...newArrayItem(),
    date: null,
    icd10: '',
    text: '',
    subtype: '',
    stage: '',
    spread: ''
})

export interface Treatment extends ArrayItem {
    protocol: string
    group: string
    startDate: string | null
    endDate: string | null
    stopReason: string
    stopReasonOther: string
    chemotherapy: boolean
}

export const newTreatment = (): Treatment => ({
    ...newArrayItem(),
    protocol: '',
    group: '',
    startDate: null,
    endDate: null,
    stopReason: 'completed',
    stopReasonOther: '',
    chemotherapy: false,
})

export interface FormValues {
    diagnoses: Diagnosis[]
    treatments: Treatment[]
}

export const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()