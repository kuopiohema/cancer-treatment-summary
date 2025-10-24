import { observer } from "mobx-react"
import { Drug } from "../../store/entity/drug"
import { EntityComponentProps } from "./entityComponentProps"
import { Group, NumberInput, Select, Text, Textarea, TextInput } from "@mantine/core"
import { getComboboxData } from '../../utils/getComboboxData'
import { use } from "react"
import { StoreContext } from "../../store/StoreContext"

const DrugComponent = observer(({ data }: EntityComponentProps<Drug>) => {
    const store = use(StoreContext)
    const drugDosingOptionsData = getComboboxData(store.data.doseFormulaOptions)

    return (
        <>
            <Group
                grow
                preventGrowOverflow={false}
                align="flex-start"
            >
                <TextInput
                    value={data.drug}
                    onChange={e => data.setDrug(e.target.value)}
                    label="Lääke"
                    placeholder="Lääkkeen nimi"
                    w={220}
                    flex="none"
                />
                <NumberInput
                    value={data.dose}
                    onChange={value => data.setDose(value)}
                    label="Annos"
                    w={80}
                    flex="none"
                />
                <Select
                    value={data.doseFormula}
                    onChange={value => data.setDoseFormula(value)}
                    label="Annoskaava"
                    data={drugDosingOptionsData}
                    w={100}
                    flex="none"
                />
                <Textarea
                    value={data.notes}
                    onChange={e => data.setNotes(e.target.value)}
                    label="Lisätiedot"
                    placeholder="Keskeytys, haittavaikutus jne."
                    minRows={1}
                />
            </Group>
            {data.doxoEquivalent > 0 && <Text size="sm">Doksorubisiiniekvivalentti: {data.doxoEquivalent} mg/m²</Text>}
        </>
    )
})

export default DrugComponent