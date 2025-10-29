export interface SignatureDefaults {
    phone: string,
    place: string
}

export const getEmptySignatureDefaults = (): SignatureDefaults => ({
    phone: '',
    place: ''
})