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
import { sctTypeOptions, type SctTypeValue } from '../../../data/sctTypeOptions'

export default function StemCellTransplantNavListItem({path, index, item}: ItemProps<StemCellTransplant>) {
    const form = useFormContext()
    const itemPath = getListItemPath(path, index)

    const [type, setType] = useState(item.type)
    const [donor, setDonor] = useState(item.donor)
    const [donorSex, setDonorSex] = useState(item.donorSex)
    const [hlaMatch, setHlaMatch] = useState(item.hlaMatch)
    const [date, setDate] = useState(item.date)

    form.watch(`${itemPath}.type`, ({value}: FormValue<SctTypeValue>) => setType(value))
    form.watch(`${itemPath}.donor`, ({value}: FormValue<DonorValue>) => setDonor(value))
    form.watch(`${itemPath}.donorSex`, ({value}: FormValue<SexValue>) => setDonorSex(value))
    form.watch(`${itemPath}.hlaMatch`, ({value}: FormValue<HlaMatchValue>) => setHlaMatch(value))
    form.watch(`${itemPath}.date`, ({value}: FormValue<string | null>) => setDate(value))

    const label = useMemo(
        () => type ? sctTypeOptions[type] : '(Uusi kantasolusiirto)',
        [type]
    )

    const sublabel = useMemo(() => {
        const donorText = donor ? donorOptions[donor] : 'Ei tiedossa'
        const sexText = donorSex ? sexOptions[donorSex] : ''
        const hlaText = hlaMatch ? hlaMatchOptions[hlaMatch] : ''
        return (
            <>
                {formatDate(date)}<br />
                Luovuttaja: {donorText}{sexText && ` - ${sexText}`}{hlaText && ` - HLA: ${hlaText}`}
            </>
        )
    }, [donor, donorSex, hlaMatch, date])

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