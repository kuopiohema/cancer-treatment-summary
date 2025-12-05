import { DrugEquivalenceList } from './drugEquivalenceList'

export const doxoEquivalents: DrugEquivalenceList = {
    drugs: [
        {
            drug: 'doksorubisiini',
            factor: 1
        },
        {
            drug: 'daunorubisiini',
            factor: 0.5
        },
        {
            drug: 'epirubisiini',
            factor: 0.67
        },
        {
            drug: 'idarubisiini',
            factor: 5
        },
        {
            drug: 'mitoksantroni',
            factor: 10
        }
    ],
    source: 'Lastenkardiologien ja -onkologien asiantuntijaryhmän kansallinen suositus 25.04.2024'
} as const