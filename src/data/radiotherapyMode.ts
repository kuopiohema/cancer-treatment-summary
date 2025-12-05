import { withUnknown } from '../utils/withUnknown'

const radiotherapyMode = [
    'Fotonisädehoito',
    'Fotonisädehoito (hyperfraktioitu)',
    'Fotonisädehoito (hypofraktioitu)',
    'Protonisädehoito',
    'Stereotaktinen ("gammaveitsi")',
    'Sisäinen (brakyterapia)'
] as const

export const radiotherapyModeOptions = withUnknown([...radiotherapyMode])