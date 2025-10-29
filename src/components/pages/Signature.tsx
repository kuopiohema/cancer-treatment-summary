import {Button, Divider, Text, TextInput, Title} from '@mantine/core'
import { observer } from 'mobx-react'
import { Signature as SignatureData } from '../../store/signature'
import { EntityComponentProps } from '../entities/entityComponentProps'
import { DateInput } from '@mantine/dates'
import EntityPage from '../entityLists/EntityPage'
import { use } from 'react'
import { StoreContext } from '../../store/StoreContext'
import dayjs from 'dayjs'

const SignaturePage = observer(({ data }: EntityComponentProps<SignatureData>) => {
    const store = use(StoreContext)

    const handleUseDefaults = () => {
        const defaults = store.data.signatureDefaults
        data.setPhone(defaults.phone)
        data.setPlace(defaults.place)
        data.setDate(dayjs().format('YYYY-MM-DD'))
    }

    return <>
        <TextInput
            value={data.name}
            onChange={e => data.setName(e.target.value)}
            label="Nimi"
            placeholder="Nimi"
        />
        <TextInput
            value={data.phone}
            onChange={e => data.setPhone(e.target.value)}
            label="Puhelin"
            placeholder="Puhelin"
        />
        <TextInput
            value={data.place}
            onChange={e => data.setPlace(e.target.value)}
            label="Paikka"
            placeholder="Paikka"
        />
        <DateInput
            value={data.date}
            onChange={value => data.setDate(value)}
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

export default function Signature() {
    const store = use(StoreContext)
    return (
        <>
            <Title order={1}>Allekirjoitus</Title>
            <Text mb="xl">
                Syötä tälle sivulle lomakkeen täyttäjän tiedot.
            </Text>
            <EntityPage entity={store.form.signature} InnerComponent={SignaturePage} />
        </>
    )
}