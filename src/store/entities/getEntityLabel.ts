import type { DataContextValue } from '../../context/DataContext.ts'
import type { TextListItem } from '../../utils/buildTextList.tsx'
import { calculateTotalEquivalentDose } from '../../utils/calculateEquivalentDose.ts'
import { formatDate, formatDateRange } from '../../utils/formatDate.ts'
import { getDonorText } from '../../utils/getDonorText.ts'
import { CellTherapy } from '../entity/cellTherapy.ts'
import { Chemotherapy } from '../entity/chemotherapy.ts'
import { Diagnosis } from '../entity/diagnosis.ts'
import type { Entity } from '../entity/entity.ts'
import { Procedure } from '../entity/procedure.ts'
import { Radiotherapy } from '../entity/radiotherapy.ts'
import { Treatment } from '../entity/treatment.ts'

interface EntityLabel {
    heading: string,
    content: TextListItem[]
}

export const getEntityLabel = <E extends Entity>(entity: E, data: DataContextValue): EntityLabel => {
    if (entity instanceof Diagnosis) {
        let heading = entity.icd10
        if (heading)
            heading += ' '
        heading += entity.text
        return {
            heading: heading || '(Uusi diagnoosi)',
            content: [
                entity.detail,
                { label: 'Todettu', content: formatDate(entity.date) },
                { label: 'Stage', content: entity.stage },
                { label: 'Levinneisyys', content: entity.spread }
            ]
        }
    }
    if (entity instanceof Treatment) {
        return {
            heading: entity.protocol || '(Uusi hoito)',
            content: [
                formatDateRange(entity.startDate, entity.endDate),
                { label: 'Hoitoryhmä', content: entity.group },
                { label: 'Hoidon loppumisen syy', content: entity.stopReason }
            ]
        }
    }
    if (entity instanceof Chemotherapy) {
        const doxoEquivalent = calculateTotalEquivalentDose(entity.drugs.entities, data.doxoEquivalents.drugs)
        // const cycloEquivalent = calculateTotalEquivalentDose(entity.drugs.entities, data.cycloEquivalents.drugs)
        return {
            heading: formatDateRange(entity.startDate, entity.endDate),
            content: [
                `${entity.drugs.entities.length} lääke${entity.drugs.entities.length !== 1 ? 'ttä' : ''}`,
                `Doksorubisiiniekvivalentti: ${doxoEquivalent} mg/m²`
                //`Syklofosfamidiekvivalentti: ${this.cycloEquivalent} mg/m²`
            ]
        }
    }
    if (entity instanceof Radiotherapy) {
        return {
            heading: entity.target || '(Uusi sädehoitojakso)',
            content: [
                formatDateRange(entity.startDate, entity.endDate),
                { label: 'Hoitomuoto', content: entity.mode },
                { label: 'Annos', content: `${entity.totalDose} Gy (${entity.fractions} x ${entity.singleDose} Gy)` },
                { label: 'Lisätiedot', content: entity.notes }
            ]
        }
    }
    if (entity instanceof Procedure) {
        return {
            heading: entity.procedure || '(Uusi toimenpide)',
            content: [
                formatDate(entity.date),
                entity.details,
                { label: 'Komplikaatiot', content: entity.complications }
            ]
        }
    }
    if (entity instanceof CellTherapy) {
        return {
            heading: entity.type || '(Uusi soluhoito)',
            content: [
                entity.origin ? `${entity.origin} siirto` : '',
                { label: 'Siirtopäivä', content: formatDate(entity.date) },
                { label: 'CAR-solujen kohde', content: entity.carTarget },
                { label: 'Luovuttaja', content: getDonorText(entity.donor, entity.donorSex) },
                { label: 'HLA-sopivuus', content: entity.hlaMatch },
                { label: 'Luovuttajan veriryhmä', content: entity.donorBloodGroup },
                { label: 'Esihoito', content: entity.conditioning },
                {
                    label: 'TBI',
                    content: entity.tbi ? `${entity.tbiDoseBody} Gy (vartalo) / ${entity.tbiDoseLungs} Gy (keuhkot)` : ''
                },
                {
                    label: 'DLI',
                    content: entity.dli ? `${formatDateRange(entity.dliStartDate, entity.dliEndDate)}, ${entity.dliDoses} annosta` : ''
                }
            ]
        }
    }

    return {
        heading: 'Tuntematon kohde',
        content: ['Tapahtui virhe: kohdetta ei tunnisteta']
    }
}