// adapted from Quasar Framework "export-file" utility function

const clean = (link: HTMLAnchorElement) => {
    setTimeout(() => {
        window.URL.revokeObjectURL(link.href)
    }, 10000)

    link.remove()
}

export const exportJsonToFile = (filename: string, data: string) => {
    const mimeType = 'application/json;charset=utf-8'
    const blob = new Blob([data], { type: mimeType })
    
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', filename)

    if (typeof link.download === 'undefined') {
        link.setAttribute('target', '_blank')
    }

    link.classList.add('hidden')
    link.style.position = 'fixed'
    document.body.appendChild(link)

    try {
        link.click()
        clean(link)
        return true
    } catch (error) {
        clean(link)
        return error
    }
}