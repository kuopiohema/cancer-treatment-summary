import { other } from './dataUtils'

export const stopReasonOptions = {
    completed: { label: 'Hoito päättynyt' },
    toxicity: { label: 'Toksisuus' },
    refractory: { label: 'Riittämätön hoitovaste' },
    relapse: { label: 'Relapsi' },
    unknown: { label: 'Ei tiedossa' },
    ...other
} as const

export type StopReasonValue = keyof typeof stopReasonOptions | ''