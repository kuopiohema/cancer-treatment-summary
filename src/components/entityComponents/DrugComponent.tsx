import { observer } from "mobx-react"
import { Drug } from "../../store/drug"
import { EntityComponentProps } from "./entityComponentProps"
import { Group, TextInput } from "@mantine/core"

const DrugComponent = observer(({ data }: EntityComponentProps<Drug>) => {
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
            </Group>
        </>
    )
})

export default DrugComponent