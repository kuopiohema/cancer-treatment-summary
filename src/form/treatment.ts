import type { StopReasonValue } from '../data/stopReasonOptions'
import type {StemCellTherapy} from './stemCellTherapy.ts'
import type { Drug } from './drug'
import { newListItem, type ListItem } from './listItem'
import type { Procedure } from './procedure'
import type { Radiotherapy } from './radiotherapy'

export interface Treatment extends ListItem {
    protocol: string
    group: string
    startDate: string | null
    endDate: string | null
    stopReason: StopReasonValue
    stopReasonOther: string
    chemo: {
        startDate: string | null
        endDate: string | null
        drugs: Drug[]
    }
    radioTherapies: Radiotherapy[]
    procedures: Procedure[]
    stemCellTherapies: StemCellTherapy[]
}

export const newTreatment = (): Treatment => ({
    ...newListItem(),
    protocol: '',
    group: '',
    startDate: null,
    endDate: null,
    stopReason: 'completed',
    stopReasonOther: '',
    chemo: {
        startDate: null,
        endDate: null,
        drugs: []
    },
    radioTherapies: [],
    procedures: [],
    stemCellTherapies: []
})