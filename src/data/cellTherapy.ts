export const cellTherapyTypeOptions = {
    autosct: 'Autologinen kantasolusiirto',
    allosct: 'Allogeeninen kantasolusiirto',
    cart: 'CAR-T-soluhoito'
} as const

export type CellTherapyTypeValue = keyof typeof cellTherapyTypeOptions | ''

export const donorOptions = {
    sibling: 'Sisarus',
    parent: 'Vanhempi',
    mud: 'Rekisteriluovuttaja'
} as const

export type DonorValues = keyof typeof donorOptions | ''

export const hlaMatchOptions = {
    haplo: 'Haploidenttinen',
    match_7_8: '7/8',
    match_8_8: '8/8',
    match_9_10: '9/10',
    match_10_10: '10/10',
    match_11_12: '11/12',
    match_12_12: '12/12',
    identical: 'Identtinen'
} as const

export type HlaMatchValues = keyof typeof hlaMatchOptions | ''
