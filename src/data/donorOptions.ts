import { unknownOption } from "./dataUtils"

export const donorOptions = {
    sibling: 'Sisarus',
    parent: 'Vanhempi',
    mud: 'Rekisteriluovuttaja',
    ...unknownOption
} as const

export type DonorValue = keyof typeof donorOptions | ''