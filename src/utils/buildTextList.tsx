import { Fragment, ReactNode } from 'react'

type TextListItem = string | { heading: string, content: string | null }

export const buildTextList = (data: (TextListItem | null)[]): ReactNode => {
    const list = [] as string[]
    data.filter((item): item is TextListItem => !!item)
        .forEach(item => {
            const { heading, content } = typeof item === 'string' ? { heading: '', content: item } : item
            if (content)
                if (heading)
                    list.push(`${heading}: ${content}`)
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