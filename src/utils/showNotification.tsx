import { notifications } from '@mantine/notifications'
import { IconCheck, IconExclamationMark, IconX } from '@tabler/icons-react'
import type { ReactNode } from 'react'

export const showNotification = (title: ReactNode, message: ReactNode, success?: boolean) => notifications.show({
    title,
    message,
    icon: success === true ? <IconCheck /> : success === false ? <IconX /> : <IconExclamationMark />,
    color: success === true ? 'green' : success === false ? 'red' : ''
})