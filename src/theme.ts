import {createTheme, NumberInput, Textarea} from '@mantine/core'

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
        })
    }
})