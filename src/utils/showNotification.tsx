import { notifications } from '@mantine/notifications'
import { IconCheck, IconExclamationMark, IconX } from '@tabler/icons-react'

export const showNotification = (title: string, message: string, success?: boolean) => notifications.show({
    title,
    message,
    icon: success === true ? <IconCheck /> : success === false ? <IconX /> : <IconExclamationMark />,
    color: success === true ? 'green' : success === false ? 'red' : ''
})