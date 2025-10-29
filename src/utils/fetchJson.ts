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