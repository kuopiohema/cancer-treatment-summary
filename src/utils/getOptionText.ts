import { SelectValue } from '../types/selectValue'
import { SelectOptionList } from '../types/selectOptionList'
import { otherOption } from './getComboboxData'

export const getOptionText = (option: SelectValue, list: SelectOptionList, otherText?: string) => {
    if (!option)
        return ''
    if (option === otherOption.value)
        return otherText ?? 'Muu'
    if (option in list)
        return list[option]
    return ''
}