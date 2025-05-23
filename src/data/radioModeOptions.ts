import { other } from './dataUtils'

export const radioModeOptions = {
    photon: 'Fotonisäde',
    'photon-hyper': 'Fotonisäde (hyperfraktioitu)',
    'photon-hypo': 'Fotonisäde (hypofraktioitu)',
    proton: 'Protonisäde',
    gamma: 'Stereotaktinen ("gammaveitsi")',
    brachy: 'Sisäinen (brakyterapia)',
    ...other
} as const

export type RadioModeValue = keyof typeof radioModeOptions | ''