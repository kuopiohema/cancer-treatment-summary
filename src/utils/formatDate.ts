import dayjs from 'dayjs'

export default function formatDate(date: string | null) {
    return date ? dayjs(date, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''
}