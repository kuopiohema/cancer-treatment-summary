import { donorOptions, DonorValue } from "../data/donorOptions";
import { SexValue } from "../data/sexOptions";

export const getDonorText = (donor: DonorValue | '', donorSex: SexValue): string => {
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
        const text = donorOptions[donor]
        switch (donorSex) {
            case 'male': return `${text} (mies)`
            case 'female': return `${text} (nainen)`
            case 'unknown':
            default:
                return `${text} (${unknownSex})`
        }
    }
}