import { useAtomValue } from "jotai";
import { stopReasonOptions } from "../../../data/stopReasonOptions";
import { Treatment } from "../../../types/form/treatment";
import formatDate from "../../../utils/formatDate";
import { getTextList } from "../../../utils/getTextList";
import NavListItem from "../NavListItem";
import { NavListItemWrapperProps } from "../navListItemWrapperProps";

const TreatmentNavListItem = ({ index, atom, onRemove }: NavListItemWrapperProps<Treatment>) => {
    const item = useAtomValue(atom)

    const label = item.protocol || '(Uusi hoito)'
    const sublabel = getTextList([
        `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`,
        item.group,
        {
            heading: 'Hoidon loppumisen syy',
            content: item.stopReason === '' ? '' : item.stopReason === 'other' ? item.stopReasonOther : stopReasonOptions[item.stopReason]
        }
    ])

    return <NavListItem
        index={index}
        id={item.id}
        label={label}
        sublabel={sublabel}
        itemName="hoito"
        path="treatments"
        onRemove={onRemove}
    />
}

export default TreatmentNavListItem