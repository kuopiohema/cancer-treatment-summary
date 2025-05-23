import type { StopReasonValue } from '../data/stopReasonOptions'
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
    radiotherapies: Radiotherapy[]
    procedures: Procedure[]
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
    radiotherapies: [],
    procedures: []
})