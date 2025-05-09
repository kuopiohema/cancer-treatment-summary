import { other } from './dataUtils'

export const radioModeOptions = {
    photon: { label: 'Fotonisäde' },
    'photon-hyper': { label: 'Fotonisäde (hyperfraktioitu)' },
    'photon-hypo': { label: 'Fotonisäde (hypofraktioitu)' },
    proton: { label: 'Protonisäde' },
    gamma: { label: 'Stereotaktinen ("gammaveitsi")' },
    brachy: { label: 'Sisäinen (brakyterapia)' },
    ...other
}

export type RadioModeValue = keyof typeof radioModeOptions | ''