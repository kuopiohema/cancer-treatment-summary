import type { CellTherapyTypeValue, DonorValue, HlaMatchValue } from '../data/cellTherapy'
import type { SexValue } from '../data/sexOptions'
import type { Drug } from './drug'
import { newListItem, type ListItem } from './listItem'

export interface CellTherapy extends ListItem {
    date: string | null
    type: CellTherapyTypeValue
    source: DonorValue
    donorSex: SexValue
    hlaMatch: HlaMatchValue
    conditioning: string
    tbiDoseOverall: number
    tbiDoseLungs: number
    drugs: Drug[]
}

export const newCellTherapy = (): CellTherapy => ({
    ...newListItem(),
    date: null,
    type: '',
    source: '',
    donorSex: '',
    hlaMatch: '',
    conditioning: '',
    tbiDoseOverall: 0,
    tbiDoseLungs: 0,
    drugs: []
})