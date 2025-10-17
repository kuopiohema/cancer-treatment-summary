import { unknownOption } from "./dataUtils"

export const hlaMatchOptions = {
    identical: 'Identtinen',
    haplo: 'Haploidenttinen',
    match_7_8: '7/8',
    match_8_8: '8/8',
    match_9_10: '9/10',
    match_10_10: '10/10',
    match_11_12: '11/12',
    match_12_12: '12/12',
    ...unknownOption
} as const

export type HlaMatchValue = keyof typeof hlaMatchOptions | ''