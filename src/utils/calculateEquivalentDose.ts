import type { DrugEquivalence } from '../data/dataStore.ts'
import type { Drug } from '../store/entities/drug.ts'

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

export const calculateTotalEquivalentDose = (drugs: Drug[], factors: DrugEquivalence[]): number =>
    drugs.reduce((value, drug) => value + calculateEquivalentDose(drug, factors), 0)