import { type Treatment } from '../formContext.ts'
import type { ItemProps } from '../types/itemProps.ts'
import ItemPage from './ItemPage.tsx'
import TreatmentItemChemo from './sections/TreatmentItemChemo.tsx'
import TreatmentItemGeneral from './sections/TreatmentItemGeneral.tsx'

export default function TreatmentItemPage({ path, index, item }: ItemProps<Treatment>) {
    return (
        <ItemPage>
            <TreatmentItemGeneral path={path} index={index} item={item} />
            <TreatmentItemChemo path={path} index={index} item={item} />
        </ItemPage>
    )
}