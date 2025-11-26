import { Button, Divider, Text, TextInput, Title } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { use } from 'react'
import { Signature as SignatureData } from '../../store/signature'
import { StoreContext } from '../../store/StoreContext'
import { emptySignatureDefaults, SignatureDefaults } from '../../types/signatureDefaults.ts'
import { fetchJson } from '../../utils/fetchJson'
import { EntityPageProps } from '../entities/pages/entityPageProps'
import EntityPageWrapper from '../entityLists/EntityPageWrapper'

const SignaturePage = observer(({ entity: data }: EntityPageProps<SignatureData>) => {
    const signatureDefaults = useQuery({
        queryKey: ['signatureDefaults'],
        queryFn: () => fetchJson<SignatureDefaults>('signatureDefaults'),
        placeholderData: emptySignatureDefaults
    })

    const handleUseDefaults = () => {
        data.set('phone', signatureDefaults.data?.phone ?? '')
        data.set('place', signatureDefaults.data?.place ?? '')
        data.set('date', dayjs().format('YYYY-MM-DD'))
    }

    return <>
        <TextInput
            value={data.name}
            onChange={e => data.set('name', e.target.value)}
            label="Nimi"
            placeholder="Nimi"
        />
        <TextInput
            value={data.phone}
            onChange={e => data.set('phone', e.target.value)}
            label="Puhelin"
            placeholder="Puhelin"
        />
        <TextInput
            value={data.place}
            onChange={e => data.set('place', e.target.value)}
            label="Paikka"
            placeholder="Paikka"
        />
        <DateInput
            value={data.date}
            onChange={value => data.set('date', value)}
            label="Päiväys"
        />
        <Divider />
        <Button
            onClick={handleUseDefaults}
            w={200}
        >
            Käytä oletusarvoja
        </Button>
    </>
})

const Signature = observer(() => {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Allekirjoitus</Title>
            <Text mb="xl">
                Syötä tälle sivulle lomakkeen täyttäjän tiedot.
            </Text>
            <EntityPageWrapper entity={store.signature} InnerComponent={SignaturePage} />
        </>
    )
})

export default Signature