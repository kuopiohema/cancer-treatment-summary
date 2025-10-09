import { useAtomValue } from "jotai"
import { Chemotherapy } from "../../../types/form/chemotherapy"
import formatDate from "../../../utils/formatDate"
import NavListItem from "../NavListItem"
import { NavListItemWrapperProps } from "../navListItemWrapperProps"

const ChemotherapyNavListItem = ({ index, atom, onRemove }: NavListItemWrapperProps<Chemotherapy>) => {
    const item = useAtomValue(atom)

    const label = `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`

    return (
        <NavListItem
            index={index}
            id={item.id}
            label={label}
            itemName="kemoterapiajakso"
            path="chemotherapies"
            onRemove={onRemove}
        />
    )
}

export default ChemotherapyNavListItem