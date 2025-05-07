import dayjs from 'dayjs'

export default function formatDate(date: string) {
    return dayjs(date, 'YYYY-MM-DD').format('DD.MM.YYYY')
}