import { withUnknown } from '../utils/withUnknown'

const treatmentStopReason = [
    'Hoito päättynyt',
    'Toksisuus',
    'Riittämätön hoitovaste',
    'Relapsi'
] as const

export const treatmentStopReasonOptions = withUnknown([...treatmentStopReason])