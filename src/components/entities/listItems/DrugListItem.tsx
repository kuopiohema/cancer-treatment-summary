import { observer } from "mobx-react-lite"
import { use, useMemo } from 'react'
import { DataContext } from '../../../context/DataContext.ts'
import { Drug } from "../../../store/entity/drug"
import { Group, NumberInput, Select, Text, Textarea, TextInput } from "@mantine/core"
import { calculateEquivalentDose } from '../../../utils/calculateEquivalentDose.ts'
import { ListItemProps } from "./listItemProps"
import { useQuery } from "@tanstack/react-query"
import { fetchSelectOptions } from "../../../utils/fetchJson"

const DrugListItem = observer(({ entity }: ListItemProps<Drug>) => {
    const doseFormulaOptions = useQuery({
        queryKey: ['doseFormula'],
        queryFn: fetchSelectOptions
    })
    
    const data = use(DataContext)
    
    const doxoEquivalent = useMemo(() => calculateEquivalentDose(entity, data.doxoEquivalents.drugs), [data.doxoEquivalents.drugs, entity])
    
    return (
        <>
            <Group
                grow
                preventGrowOverflow={false}
                align="flex-start"
            >
                <TextInput
                    value={entity.drug}
                    onChange={e => { entity.drug = e.target.value }}
                    label="Lääke"
                    placeholder="Lääkkeen nimi"
                    w={220}
                    flex="none"
                />
                <NumberInput
                    value={entity.dose}
                    onChange={value => { entity.dose = value }}
                    label="Annos"
                    w={80}
                    flex="none"
                />
                <Select
                    value={entity.doseFormula}
                    onChange={value => { entity.doseFormula = value }}
                    label="Annoskaava"
                    data={doseFormulaOptions.data}
                    w={100}
                    flex="none"
                    clearable={false}
                    allowDeselect={false}
                />
                <Textarea
                    value={entity.notes}
                    onChange={e => { entity.notes = e.target.value }}
                    label="Lisätiedot"
                    placeholder="Keskeytys, haittavaikutus jne."
                    minRows={1}
                />
            </Group>
            {doxoEquivalent > 0 && <Text size="sm">Doksorubisiiniekvivalentti: {doxoEquivalent} mg/m²</Text>}
            {/*entity.cycloEquivalent > 0 && <Text size="sm">Syklofosfamidiekvivalentti: {entity.cycloEquivalent} mg/m²</Text>*/}
        </>
    )
})

export default DrugListItem