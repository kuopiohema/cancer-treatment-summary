import {useMemo, useState} from 'react'
import {Diagnosis, useFormContext} from '../../formContext'
import type {TypedNavListItemProps} from '../NavListItem.tsx'
import NavListItem from '../NavListItem.tsx'
import formatDate from '../../utils/formatDate.ts'

export function DiagnosisNavListItem({index, item}: TypedNavListItemProps<Diagnosis>) {
    const form = useFormContext()

    const emptyLabel = '(Uusi diagnoosi)'
    const [icd10, setICD10] = useState(item.icd10)
    const [date, setDate] = useState(item.date)

    form.watch(`diagnoses.${index}.icd10`, ({value}) => {
        if (typeof value === 'string')
            setICD10(value)
    })

    form.watch(`diagnoses.${index}.date`, ({value}) => {
        if (typeof value === 'string')
            setDate(value)
    })

    const label = useMemo(() => {
        let result = icd10 || emptyLabel
        result = `${result} (${formatDate(date)})`
        return result
    }, [icd10, date])

    return (
        <NavListItem
            key={item.id}
            index={index}
            path="diagnoses"
            id={item.id}
            label={label}
            itemName="diagnoosi"
        />
    )
}