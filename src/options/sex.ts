import { unknownValue } from "../utils/withUnknown"

export const sex = {
    male: 'Mies',
    female: 'Nainen',
    unknown: unknownValue
} as const

export const sexOptions = Object.values(sex)