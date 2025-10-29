export const countWithLabel = (count: number, zero: string, one: string, multiple: string) => {
    return `${count === 0 ? 'Ei' : count} ${count === 0 ? zero : count === 1 ? one : multiple}`
}