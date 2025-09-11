import { createFormContext } from '@mantine/form'
import type { Diagnosis } from '../types/form/diagnosis'
import type { Treatment } from '../types/form/treatment'
import type { Chemotherapy } from '../types/form/chemotherapy'
import type { Radiotherapy } from '../types/form/radiotherapy'
import type { Procedure } from '../types/form/procedure'
import type { StemCellTransplant } from '../types/form/stemCellTransplant'

export interface FormValues {
    diagnoses: Diagnosis[]
    treatments: Treatment[]
    chemotherapies: Chemotherapy[]
    radiotherapies: Radiotherapy[]
    procedures: Procedure[]
    stemCellTransplants: StemCellTransplant[]
}

export const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>()