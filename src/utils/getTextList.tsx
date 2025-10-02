import { Fragment, ReactNode } from 'react'

type TextListItem = string | {heading?: string, content: string}

export const getTextList = (data: TextListItem[]): ReactNode => {
    const list = [] as string[]
    data.forEach(item => {
        const {heading, content} = typeof item === 'string' ? {heading: '', content: item} : item
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