import type { StopReasonValue } from '../../data/stopReasonOptions'
import { newEntity, type Entity } from './entity'

export interface Treatment extends Entity {
    protocol: string
    group: string
    startDate: string | null
    endDate: string | null
    stopReason: StopReasonValue
    stopReasonOther: string
}

export const newTreatment = (): Treatment => ({
    ...newEntity(),
    protocol: '',
    group: '',
    startDate: null,
    endDate: null,
    stopReason: 'completed',
    stopReasonOther: ''
})