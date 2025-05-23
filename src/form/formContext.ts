import { createFormContext } from '@mantine/form'
import type { Diagnosis } from './diagnosis'
import type { Treatment } from './treatment'

export interface FormValues {
    diagnoses: Diagnosis[]
    treatments: Treatment[]
}

export const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()