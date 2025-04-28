import {ActionIcon, Paper} from '@mantine/core'
import type {UseFormReturnType} from '@mantine/form'
import {PropsWithChildren} from 'react'
import {IconTrash} from '@tabler/icons-react'
import type {FormValues} from '../formContext.ts'

interface ItemCardProps extends PropsWithChildren {
    form: UseFormReturnType<FormValues>
    formPath: string
    index: number
}

export default function ItemCard({form, formPath, index, children}: ItemCardProps) {
    return (
        <Paper shadow="sm" withBorder p="md" bg="gray.8">
            {children}
            <ActionIcon color="red" onClick={() => form.removeListItem(formPath, index)}>
                <IconTrash size={22} />
            </ActionIcon>
        </Paper>
    )
}