import type {BloodGroupValue} from '../data/bloodGroupOptions.ts'
import type { DonorValue } from '../data/donorOptions.ts'
import type {HlaMatchValue} from '../data/hlaMatchOptions.ts'
import type { SctTypeValue } from '../data/sctTypeOptions.ts'
import type { SexValue } from '../data/sexOptions.ts'
import type { Drug } from './drug.ts'
import { newListItem, type ListItem } from './listItem.ts'

export interface StemCellTransplant extends ListItem {
    date: string | null
    type: SctTypeValue
    donor: DonorValue
    donorSex: SexValue
    hlaMatch: HlaMatchValue
    bloodGroup: BloodGroupValue
    conditioning: string
    tbiDoseBody: number
    tbiDoseLungs: number
    drugs: Drug[]
}

export const newStemCellTransplant = (): StemCellTransplant => ({
    ...newListItem(),
    date: null,
    type: '',
    donor: '',
    donorSex: '',
    hlaMatch: '',
    bloodGroup: '',
    conditioning: '',
    tbiDoseBody: 0,
    tbiDoseLungs: 0,
    drugs: []
})