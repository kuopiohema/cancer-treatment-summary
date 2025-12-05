import dayjs from 'dayjs'
import { getSnapshot, SnapshotInOf } from 'mobx-keystone'
import { Store } from '../store/store'
import { Diagnosis } from '../store/entities/diagnosis'
import { DateInputValue } from '../types/dateInputValue'
import { Treatment } from '../store/entities/treatment'
import { ForeignBody } from '../store/entities/foreignBody'
import { Chemotherapy } from '../store/entities/chemotherapy'
import { Drug } from '../store/entities/drug'
import { Radiotherapy } from '../store/entities/radiotherapy'
import { Procedure } from '../store/entities/procedure'
import { CellTherapy } from '../store/entities/cellTherapy'
import { AdverseEffect } from '../store/entities/adverseEffect'
import { cellOrigin } from '../data/cellOrigin'

export interface OldFileStructure {
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

const dateFromOldFormat = (date: string): DateInputValue => {
    const formattedDate = dayjs(date, 'DD.MM.YYYY')
    return formattedDate.isValid() ? formattedDate.format('YYYY-MM-DD') : null
}

export const loadOldVersionJson = (json: string): SnapshotInOf<Store> => {
    const data = JSON.parse(json) as OldFileStructure
    const result = new Store({})

    const {
        diagnosis,
        protocols,
        foreignBodies,
        chemo,
        chemoDrugs,
        radioTargets,
        surgeryProcedures,
        stemCellTransplants
    } = data.treatment

    result.diagnoses.add(new Diagnosis({
        date: dateFromOldFormat(diagnosis.date),
        icd10: diagnosis.icd10,
        text: diagnosis.name,
        detail: diagnosis.subtype,
        spread: diagnosis.spread
    }))

    protocols.forEach(item => result.treatments.add(new Treatment({
        protocol: item.noProtocol ? 'Ei protokollaa' : item.name,
        group: item.riskGroup,
        startDate: dateFromOldFormat(item.startDate),
        endDate: dateFromOldFormat(item.endDate)
    })))

    result.chemotherapies.add(new Chemotherapy({
        startDate: dateFromOldFormat(chemo.startDate),
        endDate: dateFromOldFormat(chemo.endDate)
    }))

    chemoDrugs.forEach(item => result.chemotherapies.entities[0].drugs.add(new Drug({
        drug: item.name,
        dose: Number.parseFloat(item.dose),
        doseFormula: item.doseType.replace('m2', 'm²'),
        notes: item.notes
    })))

    radioTargets.forEach(item => result.radiotherapies.add(new Radiotherapy({
            startDate: dateFromOldFormat(item.startDate),
            endDate: dateFromOldFormat(item.endDate),
            target: item.target,
            mode: item.type,
            singleDose: Number.parseFloat(item.singleDose),
            totalDose: Number.parseFloat(item.totalDose),
            fractions: Number.parseFloat(item.totalDose) / Number.parseFloat(item.singleDose),
            notes: item.notes
    })))

    surgeryProcedures.forEach(item => result.procedures.add(new Procedure({
        date: dateFromOldFormat(item.date),
        procedure: item.procedure,
        details: item.description
    })))

    stemCellTransplants.forEach(item => {
        const isAllo = item.source.allo

        const type = isAllo || item.source.value === 'ownSCT'
            ? 'Hematopoieettinen kantasolusiirto'
            : item.source.value === 'ownCART'
                ? 'CAR-T-soluhoito'
                : ''

        result.cellTherapies.add(new CellTherapy({
            date: dateFromOldFormat(item.date),
            origin: isAllo ? cellOrigin.allo : cellOrigin.auto,
            type,
            donor: isAllo ? item.source.label : '',
            donorSex: isAllo ? item.donorSex : '',
            hlaMatch: isAllo ? item.hlaMatch : '',
            conditioning: item.pretreatment
        }))
    })

    foreignBodies.forEach(item => result.foreignBodies.add(new ForeignBody({
        type: item.type,
        removal: item.removed ? "Poistettu" : "Ei poistettu"
    })))

    data.adverseEffects.forEach(item => result.adverseEffects.add(new AdverseEffect({
        organSystem: item.organSystem,
        description: item.description
    })))

    result.followup.set('general', data.followup.general)
    result.followup.set('vaccination', data.followup.vaccination)

    result.signature.set('name', data.filledBy.name)
    result.signature.set('phone', data.filledBy.phone)
    result.signature.set('place', data.filledBy.place)
    result.signature.set('date', dateFromOldFormat(data.filledBy.date))

    return getSnapshot(result)
}