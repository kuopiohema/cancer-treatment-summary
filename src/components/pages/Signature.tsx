import {Button, Divider, Text, TextInput, Title} from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { Signature as SignatureData } from '../../store/signature'
import { EntityPageProps } from '../entities/pages/entityPageProps'
import { DateInput } from '@mantine/dates'
import EntityPageWrapper from '../entityLists/EntityPageWrapper'
import { use } from 'react'
import { StoreContext } from '../../store/StoreContext'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { emptySignatureDefaults, SignatureDefaults } from '../../store/dataInterfaces/signatureDefaults'
import { fetchJson } from '../../utils/fetchJson'

const SignaturePage = observer(({ entity: data }: EntityPageProps<SignatureData>) => {
    const signatureDefaults = useQuery({
        queryKey: ['signatureDefaults'],
        queryFn: () => fetchJson<SignatureDefaults>('signatureDefaults'),
        placeholderData: emptySignatureDefaults
    })

    const handleUseDefaults = () => {
        data.phone = signatureDefaults.data!.phone
        data.place = signatureDefaults.data!.place
        data.date = dayjs().format('YYYY-MM-DD')
    }

    return <>
        <TextInput
            value={data.name}
            onChange={e => { data.name = e.target.value }}
            label="Nimi"
            placeholder="Nimi"
        />
        <TextInput
            value={data.phone}
            onChange={e => { data.phone = e.target.value }}
            label="Puhelin"
            placeholder="Puhelin"
        />
        <TextInput
            value={data.place}
            onChange={e => { data.place = e.target.value }}
            label="Paikka"
            placeholder="Paikka"
        />
        <DateInput
            value={data.date}
            onChange={value => { data.date = value }}
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
            <EntityPageWrapper entity={store.form.signature} InnerComponent={SignaturePage} />
        </>
    )
})

export default Signature