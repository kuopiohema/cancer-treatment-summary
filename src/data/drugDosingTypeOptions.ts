export const drugDosingTypeOptions = {
    mgm2: 'mg/m²',
    mgkg: 'mg/kg',
    mg: 'mg',
    um2: 'U/m²',
    ukg: 'U/kg',
    u: 'U',
    ugm2: 'µg/m²',
    ugkg: 'µg/kg',
    ug: 'µg'
} as const

export type DrugDosingTypeValue = keyof typeof drugDosingTypeOptions | ''