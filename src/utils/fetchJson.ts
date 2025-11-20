import { QueryFunctionContext } from "@tanstack/react-query"

export const fetchJson = async <Data>(file: string): Promise<Data> => {
    const response = await fetch(`https://kuopiohema.github.io/catrest/data/${file}.json`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    let json
    try {
        json = await response.json() as Data
    } catch {
        return {} as Data
    }
    return json
}

export const fetchSelectOptions = ({ queryKey }: QueryFunctionContext) => {
    const [key] = queryKey
    if (typeof key !== 'string')
        throw new Error('Invalid query key')
    return fetchJson<string[]>(`selectOptions/${key}`)
}