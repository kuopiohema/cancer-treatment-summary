import type { ComboboxData } from '@mantine/core'

export type SelectOptionList = Record<string, string>

const unknownOption = { value: 'unknown', label: 'Ei tiedossa' }
const otherOption = { value: 'other', label: 'Muu, mikä?' }

export const toComboboxData = (data: SelectOptionList, unknown?: boolean, other?: boolean): ComboboxData => {
    const list = Object.keys(data).map((key) => ({ value: key, label: data[key] }))
    if (unknown)
        list.push(unknownOption)
    if (other)
        list.push(otherOption)
    return list
}

export const getOptionText = (option: string, list: SelectOptionList, otherText?: string) => {
    if (option === otherOption.value)
        return otherText ?? 'Muu'
    if (option in list)
        return list[option]
    return ''
}