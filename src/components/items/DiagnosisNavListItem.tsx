import {useMemo, useState} from 'react'
import {Diagnosis, useFormContext} from '../../formContext'
import NavListItem from '../NavListItem.tsx'
import formatDate from '../../utils/formatDate.ts'
import type {ItemProps} from '../../types/itemProps.ts'
import getListItemPath from '../../utils/getListItemPath.ts'

export default function DiagnosisNavListItem({path, index, item}: ItemProps<Diagnosis>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const emptyLabel = '(Uusi diagnoosi)'
    const [icd10, setICD10] = useState(item.icd10)
    const [date, setDate] = useState(item.date)

    form.watch(`${itemPath}.icd10`, ({value}) => {
        if (typeof value === 'string')
            setICD10(value)
    })

    form.watch(`${itemPath}.date`, ({value}) => {
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
            path={path}
            index={index}
            id={item.id}
            label={label}
            itemName="diagnoosi"
        />
    )
}