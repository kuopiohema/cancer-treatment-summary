import { otherOption } from './dataUtils'

export const radioModeOptions = {
    photon: 'Fotonisädehoito',
    'photon-hyper': 'Fotonisädehoito (hyperfraktioitu)',
    'photon-hypo': 'Fotonisädehoito (hypofraktioitu)',
    proton: 'Protonisädehoito',
    gamma: 'Stereotaktinen ("gammaveitsi")',
    brachy: 'Sisäinen (brakyterapia)',
    ...otherOption
} as const

export type RadioModeValue = keyof typeof radioModeOptions | ''