import { observer } from "mobx-react-lite"
import { Drug } from "../../../store/entities/drug"
import { Group, NumberInput, Select, Text, Textarea, TextInput } from "@mantine/core"
import { ListItemProps } from "./listItemProps"
import { doseFormulaOptions } from '../../../data/doseFormula'

const DrugListItem = observer(({ entity }: ListItemProps<Drug>) => {
    return (
        <>
            <Group
                grow
                preventGrowOverflow={false}
                align="flex-start"
            >
                <TextInput
                    value={entity.drug}
                    onChange={e => entity.set('drug', e.target.value)}
                    label="Lääke"
                    placeholder="Lääkkeen nimi"
                    w={220}
                    flex="none"
                />
                <NumberInput
                    value={entity.dose}
                    onChange={value => entity.set('dose', value)}
                    label="Annos"
                    w={80}
                    flex="none"
                />
                <Select
                    value={entity.doseFormula}
                    onChange={value => entity.set('doseFormula', value)}
                    label="Annoskaava"
                    data={doseFormulaOptions}
                    w={100}
                    flex="none"
                    clearable={false}
                    allowDeselect={false}
                />
                <Textarea
                    value={entity.notes}
                    onChange={e => entity.set('notes', e.target.value)}
                    label="Lisätiedot"
                    placeholder="Keskeytys, haittavaikutus jne."
                    minRows={1}
                />
            </Group>
            {entity.doxoEquivalent > 0 && <Text size="sm">Doksorubisiiniekvivalentti: {entity.doxoEquivalent} mg/m²</Text>}
            {/*entity.cycloEquivalent > 0 && <Text size="sm">Syklofosfamidiekvivalentti: {entity.cycloEquivalent} mg/m²</Text>*/}
        </>
    )
})

export default DrugListItem