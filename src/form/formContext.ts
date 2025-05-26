import { createFormContext } from '@mantine/form'
import type { Diagnosis } from './diagnosis'
import type { Treatment } from './treatment'
import type { Chemotherapy } from './chemotherapy'
import type { Radiotherapy } from './radiotherapy'
import type { Procedure } from './procedure'
import type { StemCellTransplant } from './stemCellTransplant'

export interface FormValues {
    diagnoses: Diagnosis[]
    treatments: Treatment[]
    chemotherapies: Chemotherapy[]
    radiotherapies: Radiotherapy[]
    procedures: Procedure[]
    stemCellTransplants: StemCellTransplant[]
}

export const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()