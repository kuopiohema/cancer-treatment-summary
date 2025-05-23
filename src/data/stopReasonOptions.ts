import { other } from './dataUtils'

export const stopReasonOptions = {
    completed: 'Hoito päättynyt',
    toxicity: 'Toksisuus',
    refractory: 'Riittämätön hoitovaste',
    relapse: 'Relapsi',
    unknown: 'Ei tiedossa',
    ...other
} as const

export type StopReasonValue = keyof typeof stopReasonOptions | ''