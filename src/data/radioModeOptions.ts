import { other } from './dataUtils'

export const radioModeOptions = {
    photon: 'Fotonisädehoito',
    'photon-hyper': 'Fotonisädehoito (hyperfraktioitu)',
    'photon-hypo': 'Fotonisädehoito (hypofraktioitu)',
    proton: 'Protonisädehoito',
    gamma: 'Stereotaktinen ("gammaveitsi")',
    brachy: 'Sisäinen (brakyterapia)',
    ...other
} as const

export type RadioModeValue = keyof typeof radioModeOptions | ''