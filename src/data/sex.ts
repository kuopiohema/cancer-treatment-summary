import { unknownValue } from "../utils/withUnknown.ts"

export const sex = {
    male: 'Mies',
    female: 'Nainen',
    unknown: unknownValue
} as const

export const sexOptions = Object.values(sex)