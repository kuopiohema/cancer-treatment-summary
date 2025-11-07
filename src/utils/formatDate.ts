import dayjs from 'dayjs'
import { DateInputValue } from '../types/dateInputValue'

export function formatDate(date: DateInputValue, emptyString?: string): string {
    return date ? dayjs(date, 'YYYY-MM-DD').format('DD.MM.YYYY') : emptyString ?? 'Ei tiedossa'
}

export function formatDateRange(startDate: DateInputValue, endDate: DateInputValue): string {
    if (!startDate && !endDate)
        return ''
    return `${formatDate(startDate, 'Ei aloituspäivää')} - ${formatDate(endDate, 'Ei lopetuspäivää')}`
}