export const bloodGroupOptions = {
    oneg: 'O RhD-',
    opos: 'O RhD+',
    aneg: 'A RhD-',
    apos: 'A RhD+',
    bneg: 'B RhD-',
    bpos: 'B RhD+',
    abneg: 'AB RhD-',
    abpos: 'AB RhD+'
} as const

export type BloodGroupValue = keyof typeof bloodGroupOptions | ''