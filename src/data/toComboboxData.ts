import type { ComboboxData } from '@mantine/core'

type OptionsList = Record<string, { label: string }>

export function toComboboxData(data: OptionsList): ComboboxData {
    return Object.keys(data).map((key) => ({ value: key, label: data[key].label }))
}