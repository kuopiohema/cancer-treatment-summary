export default function getPageKey(path: string, id: string): string {
    return `${path}-${id}`
}