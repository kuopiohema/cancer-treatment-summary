export const doseFormula = {
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

export const doseFormulaOptions = Object.values(doseFormula)