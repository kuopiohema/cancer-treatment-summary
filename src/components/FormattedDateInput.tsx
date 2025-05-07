import {DateInput, type DateInputProps} from '@mantine/dates'
import dayjs, {type Dayjs} from 'dayjs'

export default function FormattedDateInput(props: DateInputProps) {
    const parser: DateInputProps['dateParser'] = (input) => {
        let date: Dayjs
        if (input === 't')
            date = dayjs()
        else
            date = dayjs(input, ['D.M.YYYY', 'D.M.YY', 'D.M', 'D'])
        return date.isValid() ? date.format('YYYY-MM-DD') : null
    }

    return (
        <DateInput
            valueFormat="DD.MM.YYYY"
            dateParser={parser}
            {...props}
        />
    )
}