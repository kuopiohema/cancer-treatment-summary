import { withUnknown } from '../utils/withUnknown'

const bloodGroup = [
    'O RhD-',
    'O RhD+',
    'A RhD-',
    'A RhD+',
    'B RhD-',
    'B RhD+',
    'AB RhD-',
    'AB RhD+'
] as const

export const bloodGroupOptions = withUnknown([...bloodGroup])