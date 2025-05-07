import { useMemo, useState } from "react"
import { Diagnosis, newDiagnosis, useFormContext } from "../../formContext"
import NavList, { DefinedNavListItemProps } from "../NavList"

function DiagnosisNavListItem({ item, index, ...props }: DefinedNavListItemProps<Diagnosis>) {
    const form = useFormContext()
    const formValues = form.getValues().diagnoses[index]

    const emptyLabel = '(Uusi diagnoosi)'
    const [icd10, setICD10] = useState(formValues.icd10)
    const [date, setDate] = useState(formValues.date)
    
    form.watch(`diagnoses.${index}.icd10`, ({value}) => {
        if (typeof(value) === 'string')
            setICD10(value)
    })

    form.watch(`diagnoses.${index}.date`, ({value}) => {
        if (typeof(value) === 'string')
            setDate(value)
    })

    const label = useMemo(() => {
        let result = icd10 || emptyLabel
        if (date)
            result = `${result} (${date})`
        return result
    }, [icd10, date])

    return (
        <NavList.Item
            key={item.id}
            index={index}
            path="diagnoses"
            id={item.id}
            label={label}
            removeButtonTooltip="Poista diagnoosi"
            {...props}
        />
    )
}

export default function DiagnosisNavList() {
    const form = useFormContext()
    const diagnoses = form.getValues().diagnoses

    return (
        <NavList
            path="diagnoses"
            itemFactory={newDiagnosis}
            title="Diagnoosit"
            addButtonTooltip="Lisää diagnoosi"
        >
            {diagnoses.map((item, index) => (
                <DiagnosisNavListItem
                    key={item.id}
                    item={item}
                    index={index}
                />
            ))}
        </NavList>
    )
}