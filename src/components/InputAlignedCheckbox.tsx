import {Checkbox, CheckboxProps, Flex, FlexProps} from '@mantine/core'

interface InputAlignedCheckboxProps extends CheckboxProps {
    wrapperProps?: FlexProps
}

export default function InputAlignedCheckbox({wrapperProps, ...checkboxProps}: InputAlignedCheckboxProps) {
    return (
        <Flex h={36} align="center" {...wrapperProps}>
            <Checkbox {...checkboxProps} />
        </Flex>
    )
}