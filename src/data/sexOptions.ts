import { unknownOption } from "./dataUtils"

export const sexOptions = {
    female: 'Nainen',
    male: 'Mies',
    ...unknownOption
} as const

export type SexValue = keyof typeof sexOptions | ''