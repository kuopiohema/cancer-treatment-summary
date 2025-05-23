import {Stack} from '@mantine/core'
import {type Treatment} from '../form/treatment'
import type {ItemProps} from '../types/itemProps'
import TreatmentSectionStemCellTherapy from './sections/TreatmentSectionStemCellTherapy.tsx'
import TreatmentSectionChemo from './sections/TreatmentSectionChemo'
import TreatmentSectionGeneral from './sections/TreatmentSectionGeneral'
import TreatmentSectionRadio from './sections/TreatmentSectionRadio'
import TreatmentSectionProcedures from './sections/TreatmentSectionProcedures'

export default function TreatmentItemPage({path, index, item}: ItemProps<Treatment>) {
    return (
        <Stack gap="sm">
            <TreatmentSectionGeneral path={path} index={index} item={item} />
            <TreatmentSectionChemo path={path} index={index} item={item} />
            <TreatmentSectionRadio path={path} index={index} item={item} />
            <TreatmentSectionProcedures path={path} index={index} item={item} />
            <TreatmentSectionStemCellTherapy path={path} index={index} item={item} />
        </Stack>
    )
}