import { withUnknown } from '../utils/withUnknown'

const hlaMatch = [
    'Identtinen',
    'Haploidenttinen',
    '7/8',
    '8/8',
    '9/10',
    '10/10',
    '11/12',
    '12/12'
] as const

export const hlaMatchOptions = withUnknown([...hlaMatch])