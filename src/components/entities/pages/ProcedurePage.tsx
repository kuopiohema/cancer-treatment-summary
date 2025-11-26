import { Group, Textarea, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { observer } from 'mobx-react-lite'
import { Procedure } from '../../../store/entities/procedure'
import { EntityPageProps } from './entityPageProps'

const ProcedurePage = observer(({ entity }: EntityPageProps<Procedure>) => {
    return (
        <>
            <Group grow preventGrowOverflow={false}>
                <DateInput
                    value={entity.date}
                    onChange={value => entity.set('date', value)}
                    label="Päivämäärä"
                />
                <TextInput
                    value={entity.procedure}
                    onChange={e => entity.set('procedure', e.target.value)}
                    label="Toimenpide"
                    placeholder="Esim. 'Nefrektomia'"
                />
            </Group>
            <Textarea
                value={entity.details}
                onChange={e => entity.set('details', e.target.value)}
                label="Tarkempi kuvaus"
                placeholder="Esim. 'Oikean munuaisen poisto kasvaimen mukana. Samalla poistettu vatsaontelon imusolmukkeita.'"
                minRows={2}
            />
            <Textarea
                value={entity.complications}
                onChange={e => entity.set('complications', e.target.value)}
                label="Komplikaatiot"
                placeholder="Esim. 'Kasvaimen kapselin rikkoutuminen'"
                minRows={2}
            />
        </>
    )
})

export default ProcedurePage