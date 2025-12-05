const foreignBodyType = [
    'Keskuslaskimokatetri',
    'Keskuslaskimoportti',
    'PICC',
    'Midline-katetri',
    'Gastrostooma (PEG)',
    'VP-shuntti',
    'Rickhamin kapseli'
] as const

export const foreignBodyTypeOptions = Object.values(foreignBodyType)