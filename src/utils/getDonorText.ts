import { SelectValue } from "../types/selectValue"
import { SelectOptionList } from '../types/selectOptionList'

const maleValue = 'male'
const femaleValue = 'female'
const unknownSexText = 'sukupuoli tuntematon'

export const getDonorText = (donor: SelectValue, donorSex: SelectValue, donorOptions: SelectOptionList): string => {
    if (!donor)
        return ''

    if (donor === 'parent') {
        if (donorSex === maleValue)
            return 'Isä'
        if (donorSex === femaleValue)
            return 'Äiti'
        return `Vanhempi (${unknownSexText})`
    }
    
    if (donor === 'sibling') {
        if (donorSex === maleValue)
            return 'Veli'
        if (donorSex === femaleValue)
            return 'Sisko'
        return `Sisarus (${unknownSexText})`
    }

    const text = donor in donorOptions ? donorOptions[donor] : 'Tuntematon luovuttaja'
    if (donorSex === maleValue)
        return `${text} (mies)`
    if (donorSex === femaleValue)
        return `${text} (nainen)`
    return `${text} (${unknownSexText})`
}