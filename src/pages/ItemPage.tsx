import type {PropsWithChildren} from 'react'
import {Container, Stack} from '@mantine/core'

export default function ItemPage({children}: PropsWithChildren) {
    return (
        <Container>
            <Stack gap="sm">
                {children}
            </Stack>
        </Container>
    )
}