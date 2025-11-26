import { Center, Title } from '@mantine/core'

interface ErrorPageProps {
    error: string
}

const ErrorPage = ({ error }: ErrorPageProps) => {
    return <Center h="100%" mih="100%">
        <Title order={1}>Virhe: {error}</Title>
    </Center>
}

export default ErrorPage