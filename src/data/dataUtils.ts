import type { ComboboxData } from '@mantine/core'

type OptionsList = Record<string, string>

export const other = { other: 'Muu, mikä?' }

export function toComboboxData(data: OptionsList): ComboboxData {
    return Object.keys(data).map((key) => ({ value: key, label: data[key] }))
}