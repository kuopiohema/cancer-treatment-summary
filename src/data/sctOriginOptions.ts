export const sctOriginOptions = {
    auto: 'Autologinen',
    allo: 'Allogeeninen'
} as const

export type SctOriginValue = keyof typeof sctOriginOptions | ''