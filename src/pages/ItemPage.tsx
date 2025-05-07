import type {PropsWithChildren} from 'react'
import {Container} from '@mantine/core'

export default function ItemPage({children}: PropsWithChildren) {
    return (
        <Container>
            {children}
        </Container>
    )
}