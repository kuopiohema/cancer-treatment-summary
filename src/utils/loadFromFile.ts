import dayjs from 'dayjs'
import { fromSnapshot, type SnapshotInOf } from 'mobx-keystone'
import { AdverseEffect } from '../store/entity/adverseEffect.ts'
import { CellTherapy } from '../store/entity/cellTherapy.ts'
import { Chemotherapy } from '../store/entity/chemotherapy.ts'
import { Diagnosis } from '../store/entity/diagnosis.ts'
import { Drug } from '../store/entity/drug.ts'
import { Entity } from '../store/entity/entity.ts'
import { ForeignBody } from '../store/entity/foreignBody.ts'
import { Procedure } from '../store/entity/procedure.ts'
import { Radiotherapy } from '../store/entity/radiotherapy.ts'
import { Treatment } from '../store/entity/treatment.ts'
import { FormStore } from '../store/formStore.ts'
import type { DateInputValue } from '../types/dateInputValue.ts'
import { OldFormStructure } from '../types/oldFormStructure.ts'
import { showNotification } from './showNotification.tsx'

const showLoadFailMessage = (message?: string) => showNotification(
    'Lataa tiedot',
    `Tiedoston lataaminen epäonnistui: ${message ?? 'Tuntematon virhe'}`,
    false
)

export const loadFromFile = async (files: FileList | null): Promise<FormStore | null> => {
    if (!files)
        return null

    if (files.length > 1)
        return null

    const file = files[0]
    try {
        const contents = await file.text()
        try { // Try to load new format
            const snapshot = JSON.parse(contents) as SnapshotInOf<FormStore>
            const data = fromSnapshot<FormStore>(snapshot)

            showNotification(
                'Lataa tiedot',
                'Tietojen lataaminen onnistui!',
                true
            )

            return data
        } catch {
            try { // Try to load old format
                const data = JSON.parse(contents) as OldFormStructure
                const store = loadFromOldFile(data)

                showNotification(
                    'Lataa tiedot',
                    'Tietojen lataaminen onnistui!',
                    true
                )

                return store
            } catch {
                showLoadFailMessage('Tiedoston sisältöä ei tunnistettu')
                return null
            }
        }
    } catch (e) {
        showLoadFailMessage(
            typeof e === 'string' ? e :
                e instanceof Error ? e.message :
                    'Tuntematon virhe'
        )

        return null
    }
}

const dateFromOldFormat = (date: string): DateInputValue => {
    const formattedDate = dayjs(date, 'DD.MM.YYYY')
    return formattedDate.isValid() ? formattedDate.format('YYYY-MM-DD') : null
}

function loadFromOldFile(data: OldFormStructure): FormStore {
    const test = new Entity({})
    const test2 = new Diagnosis({})

    return new FormStore({})
}


/*const loadFromOldFile = (data: OldFormStructure): FormStore => {
    const result = new FormStore({})

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

     /*result.diagnoses.add((() => new Diagnosis({}))())/*
        date: dateFromOldFormat(diagnosis.date),
        icd10: diagnosis.icd10,
        text: diagnosis.name,
        detail: diagnosis.subtype,
        stage: '',
        spread: diagnosis.spread
    }))

    /*protocols.forEach(item => {
        result.treatments.add(new Treatment({
            protocol: item.noProtocol ? 'Ei protokollaa' : item.name,
            group: item.riskGroup,
            startDate: dateFromOldFormat(item.startDate),
            endDate: dateFromOldFormat(item.endDate)
        }))
    })

    foreignBodies.forEach(item => {
        result.foreignBodies.add(new ForeignBody({
            type: item.type,
            removal: item.removed ? "Poistettu" : "Ei poistettu"
        }))
    })

    result.chemotherapies.add(new Chemotherapy({
        startDate: dateFromOldFormat(chemo.startDate),
        endDate: dateFromOldFormat(chemo.endDate)
    }))

    chemoDrugs.forEach(item => {
        (result.chemotherapies.entities[0] as Chemotherapy).drugs.add(new Drug({
            drug: item.name,
            dose: Number.parseFloat(item.dose),
            doseFormula: item.doseType.replace('m2', 'm²'),
            notes: item.notes
        }))
    })

    radioTargets.forEach(item => {
        result.radiotherapies.add(new Radiotherapy({
            startDate: dateFromOldFormat(item.startDate),
            endDate: dateFromOldFormat(item.endDate),
            target: item.target,
            mode: item.type,
            singleDose: Number.parseFloat(item.singleDose),
            totalDose: Number.parseFloat(item.totalDose),
            fractions: Number.parseFloat(item.totalDose) / Number.parseFloat(item.singleDose),
            notes: item.notes
        }))
    })

    surgeryProcedures.forEach(item => {
        result.procedures.add(new Procedure({
            date: dateFromOldFormat(item.date),
            procedure: item.procedure,
            details: item.description
        }))
    })

    stemCellTransplants.forEach(item => {
        result.cellTherapies.add(new CellTherapy({
            date: dateFromOldFormat(item.date),
            origin: item.source.allo ? 'Allogeeninen' : 'Autologinen',
            type: 'Hematopoieettinen kantasolusiirto',
            donor: item.source.label,
            donorSex: item.donorSex,
            hlaMatch: item.hlaMatch,
            conditioning: item.pretreatment
        }))
    })

    data.adverseEffects.forEach(item => {
        result.adverseEffects.add(new AdverseEffect({
            organSystem: item.organSystem,
            description: item.description
        }))
    })

    result.followup.setGeneral(data.followup.general)
    result.followup.setVaccination(data.followup.vaccination)

    result.signature.setName(data.filledBy.name)
    result.signature.setPhone(data.filledBy.phone)
    result.signature.setPlace(data.filledBy.place)
    result.signature.setDate(dateFromOldFormat(data.filledBy.date))*/

    //return result
//}