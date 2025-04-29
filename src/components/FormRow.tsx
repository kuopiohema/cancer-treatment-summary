import {Group, type GroupProps} from '@mantine/core'

export default function FormRow(props: GroupProps) {
    return (
        <Group grow w="100%" preventGrowOverflow={false} {...props} />
    )
}