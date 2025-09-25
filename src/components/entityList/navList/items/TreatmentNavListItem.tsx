import { stopReasonOptions } from "../../../../data/stopReasonOptions";
import { Treatment } from "../../../../types/form/treatment";
import formatDate from "../../../../utils/formatDate";
import { getTextList } from "../../../../utils/getTextList";
import { EntityListItemWrapperProps } from "../../entityListItemWrapperProps";
import NavListItem from "../NavListItem";

const TreatmentNavListItem = ({index, item, onRemove}: EntityListItemWrapperProps<Treatment>) => {
    const label = item.protocol || '(Uusi hoito)'
    const sublabel = `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`
    const info = getTextList([
        ['Hoitoryhmä', item.group],
        ['Hoidon loppumisen syy', item.stopReason === '' ? '' : item.stopReason === 'other' ? item.stopReasonOther : stopReasonOptions[item.stopReason]]
    ])

    return <NavListItem
        index={index}
        id={item.id}
        label={label}
        sublabel={sublabel}
        info={info}
        itemName="hoito"
        onRemove={onRemove}
    />
}

export default TreatmentNavListItem