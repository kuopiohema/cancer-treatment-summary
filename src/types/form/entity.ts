import { randomId } from '@mantine/hooks'

export interface Entity {
    id: string
}

export const newEntity = (): Entity => ({id: randomId('')})