import type { ComboboxData } from '@mantine/core'

type OptionsList = Record<string, string>

export const otherOption = { other: 'Muu, mikä?' }
export const unknownOption = { unknown: 'Ei tiedossa' }

export const toComboboxData = (data: OptionsList): ComboboxData => {
    return Object.keys(data).map((key) => ({ value: key, label: data[key] }))
}

export const getOptionText = <O extends string, L extends Record<O, string>>(option: O | '', list: L, otherText?: string) => {
    return option === '' ?
        '' :
        option === 'other' ?
            otherText ?? 'Muu' :
            list[option]
}