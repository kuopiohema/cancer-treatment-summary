import { SimpleGrid } from '@mantine/core'
import Protocols from './sections/Protocols'

export default function Treatments() {
    return (
        <SimpleGrid spacing="lg" cols={{base: 1, xl: 2}}>
            <Protocols />
        </SimpleGrid>
    )
}