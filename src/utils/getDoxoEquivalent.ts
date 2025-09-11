import { doxoEquivalents } from "../data/doxoEquivalents";
import { Drug } from "../types/form/drug";

export default function getDoxoEquivalent(drugs: Drug[]): number {
    return drugs.reduce((value, drug) => {
        const factor = doxoEquivalents.find((value) => value.drug === drug.drug.toLocaleLowerCase())?.factor
        if (factor && drug.dosingType == 'mgm2')
            return value + drug.dose * factor
        return value
    }, 0)
}