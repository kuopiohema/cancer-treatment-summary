import { otherOption, unknownOption } from './dataUtils'

export const stopReasonOptions = {
    completed: 'Hoito päättynyt',
    toxicity: 'Toksisuus',
    refractory: 'Riittämätön hoitovaste',
    relapse: 'Relapsi',
    ...unknownOption,
    ...otherOption
} as const

export type StopReasonValue = keyof typeof stopReasonOptions | ''