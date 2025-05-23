import { randomId } from '@mantine/hooks'

export interface ListItem {
    id: string
}

export const newListItem = (): ListItem => ({id: randomId('')})