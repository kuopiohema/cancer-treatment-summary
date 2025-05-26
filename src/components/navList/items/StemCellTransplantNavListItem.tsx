import { useMemo, useState } from 'react'
import { useFormContext } from '../../../form/formContext'
import type { StemCellTransplant } from '../../../form/stemCellTransplant'
import type { ItemProps } from '../../../types/itemProps'
import getListItemPath from '../../../utils/getListItemPath'
import { donorOptions, type DonorValue } from '../../../data/donorOptions'
import type { FormValue } from '../../../types/formValue'
import { sexOptions, type SexValue } from '../../../data/sexOptions'
import { hlaMatchOptions, type HlaMatchValue } from '../../../data/hlaMatchOptions'
import NavListItem from '../NavListItem'
import formatDate from '../../../utils/formatDate'

export default function StemCellTransplantNavListItem({path, index, item}: ItemProps<StemCellTransplant>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [donor, setDonor] = useState(item.donor)
    const [donorSex, setDonorSex] = useState(item.donorSex)
    const [hlaMatch, setHlaMatch] = useState(item.hlaMatch)
    const [date, setDate] = useState(item.date)

    form.watch(`${itemPath}.donor`, ({value}: FormValue<DonorValue>) => setDonor(value))
    form.watch(`${itemPath}.donorSex`, ({value}: FormValue<SexValue>) => setDonorSex(value))
    form.watch(`${itemPath}.hlaMatch`, ({value}: FormValue<HlaMatchValue>) => setHlaMatch(value))
    form.watch(`${itemPath}.date`, ({value}: FormValue<string | null>) => setDate(value))

    const label = useMemo(() => {
        const donorText = donor ? donorOptions[donor] : '(Uusi kantasolusiirto)'
        if (!donor || donor === 'self')
            return donorText
        const sexText = donorSex ? sexOptions[donorSex] : 'Tuntematon sukupuoli'
        const hlaText = hlaMatch ? hlaMatchOptions[hlaMatch] : 'Tuntematon HLA-sopivuus'
        return `${donorText} - ${sexText} - ${hlaText}`
    }, [donor, donorSex, hlaMatch])

    const sublabel = useMemo(() => formatDate(date), [date])

    return (
        <NavListItem
            key={item.id}
            path={path}
            index={index}
            id={item.id}
            label={label}
            sublabel={sublabel}
            itemName="kantasolusiirto"
        />
    )
}