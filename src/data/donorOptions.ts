export const donorOptions = {
    sibling: 'Sisarus',
    parent: 'Vanhempi',
    mud: 'Rekisteriluovuttaja'
} as const

export type DonorValue = keyof typeof donorOptions | ''