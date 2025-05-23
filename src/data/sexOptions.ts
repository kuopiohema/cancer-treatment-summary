export const sexOptions = {
    female: 'Nainen',
    male: 'Mies',
    unknown: 'Tuntematon'
} as const

export type SexValues = keyof typeof sexOptions | ''