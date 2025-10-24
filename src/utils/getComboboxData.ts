import type { ComboboxData } from "@mantine/core";
import { SelectOptionList } from "../types/selectOptionList";

const unknownOption = { value: 'unknown', label: 'Ei tiedossa' }
export const otherOption = { value: 'other', label: 'Muu, mikä?' }

export const getComboboxData = (data: SelectOptionList, unknown?: boolean, other?: boolean): ComboboxData => {
    const list = Object.keys(data).map((key) => ({ value: key, label: data[key] }))
    if (unknown)
        list.push(unknownOption)
    if (other)
        list.push(otherOption)
    return list
}
