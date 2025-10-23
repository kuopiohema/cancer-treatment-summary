export const fetchJson = async <Data>(file: string): Promise<Data> => {
    const response = await fetch(`https://kuopiohema.github.io/catrest/data/${file}.json`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json() as Data
}