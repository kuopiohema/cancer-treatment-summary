import {createFormContext} from '@mantine/form'
import {randomId} from '@mantine/hooks'

interface ArrayItem {
    key: string
}

const newArrayItem = (): ArrayItem => ({ key: randomId() })

interface Diagnosis extends ArrayItem {
    icd10: string
    text: string
    subtype: string
    stage: string
    spread: string
}

export const newDiagnosis = (): Diagnosis => ({
    ...newArrayItem(),
    icd10: '',
    text: '',
    subtype: '',
    stage: '',
    spread: ''
})

interface Protocol extends ArrayItem {
    protocol: string
    group: string
    startDate: string
    endDate: string
    interrupted: boolean
    interruptionReason: string
    interruptionReasonOther: string
}

export const newProtocol = (): Protocol => ({
    ...newArrayItem(),
    protocol: '',
    group: '',
    startDate: '',
    endDate: '',
    interrupted: false,
    interruptionReason: '',
    interruptionReasonOther: ''
})

export interface FormValues {
    treatments: {
        diagnoses: Diagnosis[]
        protocols: Protocol[]
    }
}

export const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()