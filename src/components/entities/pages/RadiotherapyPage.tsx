import { Autocomplete, Group, NumberInput, Text, Textarea, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useQuery } from '@tanstack/react-query'
import { observer } from 'mobx-react-lite'
import { Radiotherapy } from '../../../store/entities/radiotherapy'
import { fetchSelectOptions } from '../../../utils/fetchJson'
import { withUnknown } from '../../../utils/withUnknown'
import { EntityPageProps } from './entityPageProps'

const RadiotherapyPage = observer(({ entity }: EntityPageProps<Radiotherapy>) => {
    const radiotherapyModeOptions = useQuery({
        queryKey: ['radiotherapyMode'],
        queryFn: fetchSelectOptions,
        select: data => withUnknown(data)
    })

    return (
        <>
            <Group>
                <DateInput
                    value={entity.startDate}
                    onChange={value => entity.set('startDate', value)}
                    label="Aloituspäivä"
                />
                <DateInput
                    value={entity.endDate}
                    onChange={value => entity.set('endDate', value)}
                    label="Lopetuspäivä"
                />
            </Group>
            <TextInput
                value={entity.target}
                onChange={e => entity.set('target', e.target.value)}
                label="Kohteet"
                placeholder="Esim. 'Oikea lisämunuainen, maksa'"
            />
            <Autocomplete
                value={entity.mode}
                onChange={value => entity.set('mode', value)}
                label="Hoitomuoto"
                data={radiotherapyModeOptions.data}
            />
            <Group>
                <NumberInput
                    value={entity.fractions}
                    onChange={value => entity.set('fractions', value)}
                    label="Fraktiot"
                    allowDecimal={false}
                    w={100}
                    flex="none"
                />
                <NumberInput
                    value={entity.singleDose}
                    onChange={value => entity.set('singleDose', value)}
                    label="Kerta-annos"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={100}
                    flex="none"
                />
                <NumberInput
                    value={entity.totalDose}
                    onChange={value => entity.set('totalDose', value)}
                    label="Kokonaisannos"
                    rightSection={<Text pr="sm">Gy</Text>}
                    w={100}
                    flex="none"
                />
            </Group>
            <Textarea
                value={entity.notes}
                onChange={e => entity.set('notes', e.target.value)}
                label="Lisätiedot"
                placeholder="Keskeytys, haittavaikutukset yms."
            />
        </>
    )
})

export default RadiotherapyPage