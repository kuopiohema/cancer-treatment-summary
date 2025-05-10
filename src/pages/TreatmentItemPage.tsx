import {Stack} from '@mantine/core'
import {type Treatment} from '../formContext.ts'
import type {ItemProps} from '../types/itemProps.ts'
import TreatmentItemChemo from './sections/TreatmentItemChemo.tsx'
import TreatmentItemGeneral from './sections/TreatmentItemGeneral.tsx'
import TreatmentItemRadio from './sections/TreatmentItemRadio.tsx'

export default function TreatmentItemPage({path, index, item}: ItemProps<Treatment>) {
    return (
        <Stack gap="sm">
            <TreatmentItemGeneral path={path} index={index} item={item} />
            <TreatmentItemChemo path={path} index={index} item={item} />
            <TreatmentItemRadio path={path} index={index} item={item} />
        </Stack>
    )
}