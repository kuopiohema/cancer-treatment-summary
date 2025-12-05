import { DrugEquivalenceList } from './drugEquivalenceList'

export const cycloEquivalents: DrugEquivalenceList = {
    drugs: [
        {
            drug: 'syklofosfamidi',
            factor: 1
        },
        {
            drug: 'ifosfamidi',
            factor: 0.244
        },
        {
            drug: 'prokarbatsiini',
            factor: 0.857
        },
        {
            drug: 'klorambusiili',
            factor: 14.286
        },
        {
            drug: 'karmustiini',
            factor: 15
        },
        {
            drug: 'lomustiini',
            factor: 16
        },
        {
            drug: 'melfalaani',
            factor: 40
        },
        {
            drug: 'tiotepa',
            factor: 50
        },
        {
            drug: 'mustiini',
            factor: 100
        },
        {
            drug: 'busulfaani',
            factor: 8.823
        }
    ],
    source: 'Green et al. Pediatr Blood Cancer. 2014 Jan;61(1):53-67'
} as const