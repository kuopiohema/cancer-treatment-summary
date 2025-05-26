import {useMemo, useState} from 'react'
import type {ItemProps} from '../../../types/itemProps.ts'
import formatDate from '../../../utils/formatDate.ts'
import getListItemPath from '../../../utils/getListItemPath.ts'
import NavListItem from '../NavListItem.tsx'
import type { Diagnosis } from '../../../form/diagnosis.ts'
import { useFormContext } from '../../../form/formContext.ts'
import type { FormValue } from '../../../types/formValue.ts'

export default function DiagnosisNavListItem({path, index, item}: ItemProps<Diagnosis>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [icd10, setICD10] = useState(item.icd10)
    const [text, setText] = useState(item.text)
    const [date, setDate] = useState(item.date)

    form.watch(`${itemPath}.icd10`, ({value}: FormValue<string>) => setICD10(value))
    form.watch(`${itemPath}.text`, ({value}: FormValue<string>) => setText(value))
    form.watch(`${itemPath}.date`, ({value}: FormValue<string | null>) => setDate(value))

    const label = useMemo(() => {
        if (!icd10 && !text)
            return '(Uusi diagnoosi)'
        if (!text)
            return icd10
        if (!icd10)
            return text
        return `${icd10} ${text}`
    }, [icd10, text])
    const sublabel = useMemo(() => formatDate(date), [date])

    return (
        <NavListItem
            key={item.id}
            path={path}
            index={index}
            id={item.id}
            label={label}
            sublabel={sublabel}
            itemName="diagnoosi"
        />
    )
}