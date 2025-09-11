import { useMemo } from "react";
import { Diagnosis } from "../../../../types/form/diagnosis";
import formatDate from "../../../../utils/formatDate";
import { EntityListItemWrapperProps } from "../../entityListItemWrapperProps";
import NavListItem from "../NavListItem";

export default function DiagnosisNavListItem({index, item, onRemove}: EntityListItemWrapperProps<Diagnosis>) {
    const label = useMemo(() => {
        let label = item.icd10
        if (!!label)
            label += ' '
        label += item.text
        return !!label ? label : '(Uusi diagnoosi)'
    }, [item.icd10, item.text])
    const sublabel = formatDate(item.date)

    return (
        <NavListItem
            index={index}
            id={item.id}
            label={label}
            sublabel={sublabel}
            itemName="diagnoosi"
            onRemove={onRemove}
        />
    )
}