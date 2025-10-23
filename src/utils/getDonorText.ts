import { SelectOptionList } from "./selectOptionListUtils"

export const getDonorText = (donor: string, donorSex: string, donorOptions: SelectOptionList): string => {
    if (!donor)
        return ''

    const unknownSex = 'sukupuoli tuntematon'

    if (donor === 'parent') {
        switch (donorSex) {
            case 'male': return 'Isä'
            case 'female': return 'Äiti'
            case 'unknown':
            default:
                return `Vanhempi (${unknownSex})`
        }
    } else if (donor === 'sibling') {
        switch (donorSex) {
            case 'male': return 'Veli'
            case 'female': return 'Sisko'
            case 'unknown':
            default:    
                return `Sisarus (${unknownSex})`
        }
    } else {
        const text = donor in donorOptions ? donorOptions[donor] : 'Tuntematon luovuttaja'
        switch (donorSex) {
            case 'male': return `${text} (mies)`
            case 'female': return `${text} (nainen)`
            case 'unknown':
            default:
                return `${text} (${unknownSex})`
        }
    }
}