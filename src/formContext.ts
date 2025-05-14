import {createFormContext} from '@mantine/form'
import {randomId} from '@mantine/hooks'
import type {DrugDosingValue} from './data/drugDosingOptions'
import type {RadioModeValue} from './data/radioModeOptions'
import type {StopReasonValue} from './data/stopReasonOptions'

export interface ListItem {
    id: string
}

const newListItem = (): ListItem => ({id: randomId('')})

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

export interface Chemo extends ListItem {
    drug: string
    dose: number
    dosingType: DrugDosingValue
    notes: string
}

export const newChemo = (): Chemo => ({
    ...newListItem(),
    drug: '',
    dose: 0,
    dosingType: 'mgm2',
    notes: ''
})

export interface Radiotherapy extends ListItem {
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
    ...newListItem(),
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

export interface Procedure extends ListItem {
    date: string | null
    procedure: string
    details: string
    complications: string
}

export const newProcedure = (): Procedure => ({
    ...newListItem(),
    date: null,
    procedure: '',
    details: '',
    complications: ''
})

export interface CellTherapy extends ListItem {
    
}

export interface Treatment extends ListItem {
    protocol: string
    group: string
    startDate: string | null
    endDate: string | null
    stopReason: StopReasonValue
    stopReasonOther: string
    chemo: {
        startDate: string | null
        endDate: string | null
        drugs: Chemo[]
    }
    radiotherapies: Radiotherapy[]
    procedures: Procedure[]
}

export const newTreatment = (): Treatment => ({
    ...newListItem(),
    protocol: '',
    group: '',
    startDate: null,
    endDate: null,
    stopReason: 'completed',
    stopReasonOther: '',
    chemo: {
        startDate: null,
        endDate: null,
        drugs: []
    },
    radiotherapies: [],
    procedures: []
})

export interface FormValues {
    diagnoses: Diagnosis[]
    treatments: Treatment[]
}

export const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()