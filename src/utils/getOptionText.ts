export const getOptionText = <O extends string, L extends Record<O, string>>(option: O | '', list: L, otherText: string) => {
    return option === '' ?
        '' :
        option === 'other' ?
            otherText || 'Muu' :
            list[option]
}