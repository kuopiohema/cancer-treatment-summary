import { Fragment, ReactNode } from 'react'

export const getTextList = (data: [string, string][]): ReactNode => {
    const list = [] as string[]
    data.forEach(item => {
        const [heading, content] = item
        if (content)
            list.push(`${heading}: ${content}`)
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