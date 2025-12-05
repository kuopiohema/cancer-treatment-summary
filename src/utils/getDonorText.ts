import { cellDonor } from '../data/cellDonor.ts'
import { sex } from "../data/sex.ts"
import { SelectValue } from "../types/selectValue"
import { unknownValue } from "./withUnknown"

const unknownSexText = 'sukupuoli tuntematon'

export const getDonorText = (donorValue: SelectValue, donorSexValue: SelectValue): string => {
    if (!donorValue)
        return ''

    if (donorValue === cellDonor.parent) {
        if (donorSexValue === sex.male)
            return 'Isä'
        if (donorSexValue === sex.female)
            return 'Äiti'
        return `Vanhempi (${unknownSexText})`
    }
    
    if (donorValue === cellDonor.sibling) {
        if (donorSexValue === sex.male)
            return 'Veli'
        if (donorSexValue === sex.female)
            return 'Sisko'
        return `Sisarus (${unknownSexText})`
    }

    const text = donorValue === unknownValue ? 'Tuntematon luovuttaja' : donorValue
    if (donorSexValue === sex.male)
        return `${text} (mies)`
    if (donorSexValue === sex.female)
        return `${text} (nainen)`
    return `${text} (${unknownSexText})`
}