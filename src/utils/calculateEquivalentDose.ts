import type { DrugEquivalence } from '../store/dataInterfaces/drugEquivalenceList.ts'
import type { Drug } from '../store/entity/drug.ts'

export const calculateEquivalentDose = (drug: Drug, factors: DrugEquivalence[]) => {
    const factor = factors.find((value) => value.drug === drug.drug.toLocaleLowerCase())?.factor
    if (factor && typeof drug.dose === 'number') {
        if (drug.doseFormula === 'mg/m²')
            return drug.dose * factor
        if (drug.doseFormula === 'mg/kg')
            return drug.dose * 30 * factor
        return 0
    }
    else
        return 0
}