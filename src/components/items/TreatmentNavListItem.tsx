import NavListItem from '../NavListItem.tsx'
import {useMemo, useState} from 'react'
import formatDate from '../../utils/formatDate.ts'
import type {ItemProps} from '../../types/itemProps.ts'
import getListItemPath from '../../utils/getListItemPath.ts'
import { useFormContext } from '../../form/formContext.ts'
import type { Treatment } from '../../form/treatment.ts'

export default function TreatmentNavListItem({path, index, item}: ItemProps<Treatment>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [protocol, setProtocol] = useState(item.protocol)
    form.watch(`${itemPath}.protocol`, ({value}) => {
        if (typeof value === 'string')
            setProtocol(value)
    })

    const [startDate, setStartDate] = useState(item.startDate)
    form.watch(`${itemPath}.startDate`, ({value}) => {
        if (typeof value === 'string')
            setStartDate(value)
    })

    const [endDate, setEndDate] = useState(item.endDate)
    form.watch(`${itemPath}.endDate`, ({value}) => {
        if (typeof value === 'string')
            setEndDate(value)
    })

    const label = useMemo(() => protocol || '(Uusi hoito)', [protocol])
    const sublabel = useMemo(() => `${formatDate(startDate)} - ${formatDate(endDate)}`, [startDate, endDate])

    return (
        <NavListItem
            key={item.id}
            path={path}
            index={index}
            id={item.id}
            label={label}
            sublabel={sublabel}
            itemName="hoito"
        />
    )
}