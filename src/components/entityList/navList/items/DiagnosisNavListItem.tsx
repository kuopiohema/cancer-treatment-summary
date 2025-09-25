import { Diagnosis } from "../../../../types/form/diagnosis";
import formatDate from "../../../../utils/formatDate";
import { getTextList } from "../../../../utils/getTextList";
import { EntityListItemWrapperProps } from "../../entityListItemWrapperProps";
import NavListItem from "../NavListItem";

const DiagnosisNavListItem = ({ index, item, onRemove }: EntityListItemWrapperProps<Diagnosis>) => {
    const getLabel = () => {
        let label = item.icd10
        if (label)
            label += ' '
        label += item.text
        return label ? label : '(Uusi diagnoosi)'
    }

    const label = getLabel()
    const sublabel = formatDate(item.date)
    const info = getTextList([
        ['Tarkempi kuvaus', item.detail],
        ['Stage', item.stage],
        ['Levinneisyys', item.spread]
    ])

    return (
        <NavListItem
            index={index}
            id={item.id}
            label={label}
            sublabel={sublabel}
            info={info}
            itemName="diagnoosi"
            onRemove={onRemove}
        />
    )
}

export default DiagnosisNavListItem