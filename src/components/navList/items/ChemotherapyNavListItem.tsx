import { useMemo, useState } from 'react'
import type { Chemotherapy } from '../../../form/chemotherapy'
import { useFormContext } from '../../../form/formContext'
import type { FormValue } from '../../../types/formValue'
import type { ItemProps } from '../../../types/itemProps'
import getListItemPath from '../../../utils/getListItemPath'
import formatDate from '../../../utils/formatDate'
import NavListItem from '../NavListItem'

export default function ChemotherapyNavListItem({path, index, item}: ItemProps<Chemotherapy>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [startDate, setStartDate] = useState(item.startDate)
    const [endDate, setEndDate] = useState(item.endDate)

    form.watch(`${itemPath}.startDate`, ({value}: FormValue<string | null>) => setStartDate(value))
    form.watch(`${itemPath}.endDate`, ({value}: FormValue<string | null>) => setEndDate(value))

    const label = useMemo(() => `${formatDate(startDate)} - ${formatDate(endDate)}`, [startDate, endDate])

    return (
        <NavListItem
            key={item.id}
            path={path}
            index={index}
            id={item.id}
            label={label}
            itemName="kemoterapiajakso"
        />
    )
}