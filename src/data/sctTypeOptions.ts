export const sctTypeOptions = {
    auto: 'Autologinen',
    allo: 'Allogeeninen'
} as const

export type SctTypeValue = keyof typeof sctTypeOptions | ''