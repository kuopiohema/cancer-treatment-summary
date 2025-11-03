import { Autocomplete, createTheme, NumberInput, Select, Textarea } from '@mantine/core'
import { DateInput, type DateInputProps } from '@mantine/dates'
import dayjs, { type Dayjs } from 'dayjs'

const defaultDateParser: DateInputProps['dateParser'] = (input) => {
    let date: Dayjs
    if (input === 't')
        date = dayjs()
    else
        date = dayjs(input, ['D.M.YYYY', 'D.M.YY', 'D.M', 'D'])
    return date.isValid() ? date.format('YYYY-MM-DD') : null
}

export const theme = createTheme({
    cursorType: 'pointer',
    components: {
        NumberInput: NumberInput.extend({
            defaultProps: {
                allowNegative: false,
                hideControls: true,
                decimalSeparator: ',',
                decimalScale: 2
            }
        }),
        Textarea: Textarea.extend({
            defaultProps: {
                autosize: true
            }
        }),
        DateInput: DateInput.extend({
            defaultProps: {
                valueFormat: 'DD.MM.YYYY',
                dateParser: defaultDateParser,
                w: 140,
                flex: 'none',
                placeholder: 'pp.kk.vvvv',
                clearable: true
            }
        }),
        Select: Select.extend({
            defaultProps: {
                clearable: true,
                searchable: true,
                placeholder: 'Valitse luettelosta...'
            }
        }),
        Autocomplete: Autocomplete.extend({
            defaultProps: {
                clearable: true,
                placeholder: 'Valitse luettelosta tai syötä vapaasti...'
            }
        })
    }
})