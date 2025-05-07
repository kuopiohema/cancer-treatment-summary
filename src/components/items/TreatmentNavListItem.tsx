import NavListItem, {type TypedNavListItemProps} from '../NavListItem.tsx'
import {type Treatment, useFormContext} from '../../formContext.ts'
import {useMemo, useState} from 'react'
import formatDate from '../../utils/formatDate.ts'

export function TreatmentNavListItem({index, item}: TypedNavListItemProps<Treatment>) {
    const form = useFormContext()
    const formValues = form.getValues().treatments[index]

    const emptyLabel = '(Uusi hoito)'
    const [protocol, setProtocol] = useState(formValues.protocol)
    const [startDate, setStartDate] = useState(formValues.startDate)
    const [endDate, setEndDate] = useState(formValues.endDate)

    form.watch(`treatments.${index}.protocol`, ({value}) => {
        if (typeof value === 'string')
            setProtocol(value)
    })

    form.watch(`treatments.${index}.startDate`, ({value}) => {
        if (typeof value === 'string')
            setStartDate(value)
    })

    form.watch(`treatments.${index}.endDate`, ({value}) => {
        if (typeof value === 'string')
            setEndDate(value)
    })

    const label = useMemo(() => {
        return `${protocol || emptyLabel} (${formatDate(startDate)} - ${formatDate(endDate)})`
    }, [protocol, startDate, endDate])

    return (
        <NavListItem
            key={item.id}
            index={index}
            path="treatments"
            id={item.id}
            label={label}
            itemName="hoito"
        />
    )
}