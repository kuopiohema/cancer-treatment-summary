import { Diagnosis } from "../../../types/form/diagnosis";
import formatDate from "../../../utils/formatDate";
import { getTextList } from "../../../utils/getTextList";
import NavListItem from "../NavListItem";
import { NavListItemWrapperProps } from "../navListItemWrapperProps";

const DiagnosisNavListItem = ({ index, entity, onRemove }: NavListItemWrapperProps<Diagnosis>) => {
    const getLabel = () => {
        let label = entity.icd10
        if (label)
            label += ' '
        label += entity.text
        return label ? label : '(Uusi diagnoosi)'
    }

    const label = getLabel()
    const sublabel = getTextList([
        formatDate(entity.date),
        entity.detail,
        entity.stage,
        entity.spread
    ])

    return (
        <NavListItem
            index={index}
            id={entity.id}
            label={label}
            sublabel={sublabel}
            itemName="diagnoosi"
            path="diagnoses"
            onRemove={onRemove}
        />
    )
}

export default DiagnosisNavListItem