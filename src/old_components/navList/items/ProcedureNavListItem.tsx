import { useMemo, useState } from 'react'
import { useFormContext } from '../../../form/formContext'
import type { Procedure } from '../../../types/form/procedure'
import type { ItemProps } from '../../../types/itemProps'
import getListItemPath from '../../../utils/getListItemPath'
import type { FormValue } from '../../../types/formValue'
import formatDate from '../../../utils/formatDate'
import NavListItem from '../NavListItem'

export default function ProcedureNavListItem({path, index, item}: ItemProps<Procedure>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [procedure, setProcedure] = useState(item.procedure)
    const [date, setDate] = useState(item.date)

    form.watch(`${itemPath}.procedure`, ({value}: FormValue<string>) => setProcedure(value))
    form.watch(`${itemPath}.date`, ({value}: FormValue<string | null>) => setDate(value))

    const label = useMemo(() => procedure || '(Uusi toimenpide)', [procedure])
    const sublabel = useMemo(() => formatDate(date), [date])

    return (
        <NavListItem
            key={item.id}
            path={path}
            index={index}
            id={item.id}
            label={label}
            sublabel={sublabel}
            itemName="toimenpide"
        />
    )
}