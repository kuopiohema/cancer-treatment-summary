import { DateInput, DateInputProps } from "@mantine/dates";
import dayjs from "dayjs";

export default function DateInputFormatted(props: DateInputProps) {
    const dateParser: DateInputProps['dateParser'] = (input) => {
        if (input === 't') {
            return new Date()
        }

        const date = dayjs(input, 'D.M.YYYY')
        if (date.isValid())
            return date.toDate()
        else
            return dayjs(input, 'D.M.YY').toDate()
    }

    return (
        <DateInput
            valueFormat="DD.MM.YYYY"
            dateParser={dateParser}
            clearable
            {...props}
        />
    )
}