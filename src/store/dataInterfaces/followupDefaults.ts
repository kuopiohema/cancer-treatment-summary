export interface FollowupDefaults {
    growth: string,
    bloodPressure: string,
    heart: {
        boy: {
            lowRisk: string,
            mediumRisk: string,
            highRisk: string,
        },
        girl: {
            lowRisk: string,
            mediumRisk: string,
            highRisk: string,
        }
    },
    lifestyle: string,
    vaccination: {
        influenza: string,
        unvaccinated: string,
        interrupted: string,
        standardRisk: string,
        highRisk: string,
        autoSCT: string,
        alloSCT: string
    }
}

export const emptyFollowupDefaults: FollowupDefaults = {
    growth: '',
    bloodPressure: '',
    heart: {
        boy: {
            lowRisk: '',
            mediumRisk: '',
            highRisk: '',
        },
        girl: {
            lowRisk: '',
            mediumRisk: '',
            highRisk: '',
        }
    },
    lifestyle: '',
    vaccination: {
        influenza: '',
        unvaccinated: '',
        interrupted: '',
        standardRisk: '',
        highRisk: '',
        autoSCT: '',
        alloSCT: ''
    }
}