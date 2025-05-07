import {createFormContext} from '@mantine/form'
import {randomId} from '@mantine/hooks'

export interface ArrayItem {
    id: string
}

const newArrayItem = (): ArrayItem => ({ id: randomId() })

export interface Diagnosis extends ArrayItem {
    date: string
    icd10: string
    text: string
    subtype: string
    stage: string
    spread: string
}

export const newDiagnosis = (): Diagnosis => ({
    ...newArrayItem(),
    date: '',
    icd10: '',
    text: '',
    subtype: '',
    stage: '',
    spread: ''
})

export interface Protocol extends ArrayItem {
    protocol: string
    group: string
    startDate: string
    endDate: string
    stopReason: string
    stopReasonOther: string
}

export const newProtocol = (): Protocol => ({
    ...newArrayItem(),
    protocol: '',
    group: '',
    startDate: '',
    endDate: '',
    stopReason: '',
    stopReasonOther: ''
})

export interface FormValues {
    diagnoses: Diagnosis[]
    treatments: {
        protocols: Protocol[]
    }
}

export const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()