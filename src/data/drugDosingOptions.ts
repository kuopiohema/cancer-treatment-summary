export const drugDosingOptions = {
    mgm2: { label: 'mg/m²' },
    mgkg: { label: 'mg/kg' },
    mg: { label: 'mg' },
    um2: { label: 'U/m²' },
    ukg: { label: 'U/kg' },
    u: { label: 'U' },
    ugm2: { label: 'µg/m²' },
    ugkg: { label: 'µg/kg' },
    ug: { label: 'µg' }
}

export type DrugDosingValue = keyof typeof drugDosingOptions | ''