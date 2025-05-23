import type {BloodGroupValue} from '../data/bloodGroupOptions.ts'
import type { DonorValue } from '../data/donorOptions.ts'
import type {HlaMatchValue} from '../data/hlaMatchOptions.ts'
import type { SexValue } from '../data/sexOptions'
import type { Drug } from './drug'
import { newListItem, type ListItem } from './listItem'

export interface StemCellTherapy extends ListItem {
    date: string | null
    donor: DonorValue
    donorSex: SexValue
    hlaMatch: HlaMatchValue
    bloodGroup: BloodGroupValue
    conditioning: string
    tbiDoseBody: number
    tbiDoseLungs: number
    drugs: Drug[]
}

export const newStemCellTherapy = (): StemCellTherapy => ({
    ...newListItem(),
    date: null,
    donor: '',
    donorSex: '',
    hlaMatch: '',
    bloodGroup: '',
    conditioning: '',
    tbiDoseBody: 0,
    tbiDoseLungs: 0,
    drugs: []
})