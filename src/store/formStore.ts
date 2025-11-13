import { model, Model, modelAction, prop } from "mobx-keystone";
import { NavEntityList } from "./navEntityList";
import { Diagnosis } from "./entity/diagnosis";
import { Treatment } from "./entity/treatment";
import { Chemotherapy } from "./entity/chemotherapy";
import { Radiotherapy } from "./entity/radiotherapy";
import { Procedure } from "./entity/procedure";
import { CellTherapy } from "./entity/cellTherapy";
import { EntityList } from "./entityList";
import { ForeignBody } from "./entity/foreignBody";
import { AdverseEffect } from "./entity/adverseEffect";
import { Followup } from "./followup";
import { Signature } from "./signature";
import { OldFormStructure } from "../types/oldFormStructure";
import dayjs from "dayjs";
import { DateInputValue } from "../types/dateInputValue";
import { Drug } from "./entity/drug";

const dateFromOldFormat = (date: string): DateInputValue => {
    const formattedDate = dayjs(date, 'DD.MM.YYYY')
    return formattedDate.isValid() ? formattedDate.format('YYYY-MM-DD') : null
}

@model('catrest/formStore')
export class FormStore extends Model({
    diagnoses: prop<NavEntityList<Diagnosis>>(() => new NavEntityList({})),
    treatments: prop<NavEntityList<Treatment>>(() => new NavEntityList({})),
    chemotherapies: prop<NavEntityList<Chemotherapy>>(() => new NavEntityList({})),
    radiotherapies: prop<NavEntityList<Radiotherapy>>(() => new NavEntityList({})),
    procedures: prop<NavEntityList<Procedure>>(() => new NavEntityList({})),
    cellTherapies: prop<NavEntityList<CellTherapy>>(() => new NavEntityList({})),
    foreignBodies: prop<EntityList<ForeignBody>>(() => new EntityList({})),
    adverseEffects: prop<EntityList<AdverseEffect>>(() => new EntityList({})),
    followup: prop<Followup>(() => new Followup({})),
    signature: prop<Signature>(() => new Signature({}))
}) {
    @modelAction
    clear() {
        this.diagnoses.clear()
        this.treatments.clear()
        this.chemotherapies.clear()
        this.radiotherapies.clear()
        this.procedures.clear()
        this.cellTherapies.clear()
        this.foreignBodies.clear()
        this.adverseEffects.clear()
        this.followup.clear()
        this.signature.clear()
    }

    @modelAction
    loadFromOldFile(data: OldFormStructure) {
        this.clear()

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

        this.diagnoses.add(new Diagnosis({
            date: dateFromOldFormat(diagnosis.date),
            icd10: diagnosis.icd10,
            text: diagnosis.name,
            detail: diagnosis.subtype,
            stage: '',
            spread: diagnosis.spread
        }))

        protocols.forEach(item => {
            this.treatments.add(new Treatment({
                protocol: item.noProtocol ? 'Ei protokollaa' : item.name,
                group: item.riskGroup,
                startDate: dateFromOldFormat(item.startDate),
                endDate: dateFromOldFormat(item.endDate)
            }))
        })

        foreignBodies.forEach(item => {
            this.foreignBodies.add(new ForeignBody({
                type: item.type,
                removal: item.removed ? "Poistettu" : "Ei poistettu"
            }))
        })

        this.chemotherapies.add(new Chemotherapy({
            startDate: dateFromOldFormat(chemo.startDate),
            endDate: dateFromOldFormat(chemo.endDate)
        }))

        chemoDrugs.forEach(item => {
            (this.chemotherapies.entities[0] as Chemotherapy).drugs.add(new Drug({
                drug: item.name,
                dose: Number.parseFloat(item.dose),
                doseFormula: item.doseType.replace('m2', 'm²'),
                notes: item.notes
            }))
        })

        radioTargets.forEach(item => {
            this.radiotherapies.add(new Radiotherapy({
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
            this.procedures.add(new Procedure({
                date: dateFromOldFormat(item.date),
                procedure: item.procedure,
                details: item.description
            }))
        })

        stemCellTransplants.forEach(item => {
            this.cellTherapies.add(new CellTherapy({
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
            this.adverseEffects.add(new AdverseEffect({
                organSystem: item.organSystem,
                description: item.description
            }))
        })

        this.followup.setGeneral(data.followup.general)
        this.followup.setVaccination(data.followup.vaccination)

        this.signature.setName(data.filledBy.name)
        this.signature.setPhone(data.filledBy.phone)
        this.signature.setPlace(data.filledBy.place)
        this.signature.setDate(dateFromOldFormat(data.filledBy.date))
    }
}