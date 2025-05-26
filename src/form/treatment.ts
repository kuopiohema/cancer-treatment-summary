import type { StopReasonValue } from '../data/stopReasonOptions'
import { newListItem, type ListItem } from './listItem'

export interface Treatment extends ListItem {
    protocol: string
    group: string
    startDate: string | null
    endDate: string | null
    stopReason: StopReasonValue
    stopReasonOther: string
}

export const newTreatment = (): Treatment => ({
    ...newListItem(),
    protocol: '',
    group: '',
    startDate: null,
    endDate: null,
    stopReason: 'completed',
    stopReasonOther: ''
})