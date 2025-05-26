import { useMemo, useState } from 'react'
import { useFormContext } from '../../../form/formContext'
import type { Radiotherapy } from '../../../form/radiotherapy'
import type { ItemProps } from '../../../types/itemProps'
import getListItemPath from '../../../utils/getListItemPath'
import NavListItem from '../NavListItem'
import type { FormValue } from '../../../types/formValue'
import formatDate from '../../../utils/formatDate'

export default function RadiotherapyNavListItem({path, index, item}: ItemProps<Radiotherapy>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [target, setTarget] = useState(item.target)
    const [totalDose, setTotalDose] = useState(item.totalDose)
    const [startDate, setStartDate] = useState(item.startDate)
    const [endDate, setEndDate] = useState(item.endDate)

    form.watch(`${itemPath}.target`, ({value}: FormValue<string>) => setTarget(value))
    form.watch(`${itemPath}.totalDose`, ({value}: FormValue<number>) => setTotalDose(value))
    form.watch(`${itemPath}.startDate`, ({value}: FormValue<string | null>) => setStartDate(value))
    form.watch(`${itemPath}.endDate`, ({value}: FormValue<string | null>) => setEndDate(value))
    
    const label = useMemo(() => `${target || '(Uusi sädehoito)'} (${totalDose} Gy)`, [target, totalDose])
    const sublabel = useMemo(() => `${formatDate(startDate)} - ${formatDate(endDate)}`, [startDate, endDate])   

    return (
        <NavListItem
            key={item.id}
            path={path}
            index={index}
            id={item.id}
            label={label}
            sublabel={sublabel}
            itemName="sädehoito"
        />
    )
}