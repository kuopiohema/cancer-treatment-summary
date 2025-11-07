import { Fragment, ReactNode } from 'react'

export type TextListItem = string | { label: string, content: string | null }

export const buildTextList = (data: (TextListItem | null)[]): ReactNode => {
    const list: string[] = []
    data.filter((item): item is TextListItem => !!item)
        .forEach(item => {
            const { label, content } = typeof item === 'string' ? { label: '', content: item } : item
            if (content)
                if (label)
                    list.push(`${label}: ${content}`)
                else
                    list.push(content)
        })

    if (list.length > 0) {
        return <>
            {list.map((value) =>
                <Fragment key={value}>
                    {value}<br />
                </Fragment>
            )}
        </>
    }

    return ''
}