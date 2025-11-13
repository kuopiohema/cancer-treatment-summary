export interface OldFormStructure {
    treatment: {
        diagnosis: {
            icd10: string,
            name: string,
            date: string,
            subtype: string,
            spread: string,
            spreadImgData: string,
            printSpreadPicture: boolean
        },
        protocols: {
            name: string,
            noProtocol: boolean,
            riskGroup: string,
            startDate: string,
            endDate: string
        }[],
        foreignBodies: {
            type: string,
            removed: boolean
        }[],
        chemo: {
            done: boolean,
            startDate: string,
            endDate: string
        },
        chemoDrugs: {
            name: string,
            dose: string,
            doseType: string,
            notes: string
        }[],
        radio: {
            done: boolean,
            startDate: string,
            endDate: string
        },
        radioTargets: {
            target: string,
            type: string,
            startDate: string,
            endDate: string,
            singleDose: string,
            totalDose: string,
            notes: string
        }[],
        surgeryProcedures: {
            procedure: string,
            date: string,
            description: string
        }[],
        stemCellTransplants: {
            date: string,
            source: {
                value: string,
                label: string,
                allo: boolean
            },
            donorSex: string,
            hlaMatch: string,
            pretreatment: string
        }[]
    },
    adverseEffects: {
        organSystem: string,
        description: string
    }[],
    followup: {
        general: string,
        vaccination: string
    },
    filledBy: {
        name: string,
        phone: string,
        place: string,
        date: string
    }
}