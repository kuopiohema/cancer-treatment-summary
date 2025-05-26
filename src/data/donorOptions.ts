export const donorOptions = {
    self: 'Autologinen',
    sibling: 'Allogeeninen (sisarus)',
    parent: 'Allogeeninen (vanhempi)',
    mud: 'Allogeeninen (rekisteriluovuttaja)'
} as const

export type DonorValue = keyof typeof donorOptions | ''