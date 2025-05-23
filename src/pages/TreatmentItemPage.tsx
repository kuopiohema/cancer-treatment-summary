import {Stack} from '@mantine/core'
import {type Treatment} from '../form/treatment.ts'
import type {ItemProps} from '../types/itemProps.ts'
import TreatmentSectionChemo from './sections/TreatmentSectionChemo.tsx'
import TreatmentSectionGeneral from './sections/TreatmentSectionGeneral.tsx'
import TreatmentSectionRadio from './sections/TreatmentSectionRadio.tsx'
import TreatmentSectionProcedures from './sections/TreatmentSectionProcedures.tsx'

export default function TreatmentItemPage({path, index, item}: ItemProps<Treatment>) {
    return (
        <Stack gap="sm">
            <TreatmentSectionGeneral path={path} index={index} item={item} />
            <TreatmentSectionChemo path={path} index={index} item={item} />
            <TreatmentSectionRadio path={path} index={index} item={item} />
            <TreatmentSectionProcedures path={path} index={index} item={item} />
        </Stack>
    )
}