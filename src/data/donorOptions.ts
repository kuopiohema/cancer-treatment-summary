export const donorOptions = {
    self: 'Itse (autologinen)',
    sibling: 'Sisarus',
    parent: 'Vanhempi',
    mud: 'Rekisteriluovuttaja'
} as const

export type DonorValue = keyof typeof donorOptions | ''