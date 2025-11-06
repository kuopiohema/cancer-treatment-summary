import dayjs from 'dayjs'
import {
    AlignmentType,
    Document,
    Footer,
    Header,
    HeadingLevel,
    type IStylesOptions,
    Packer,
    PageNumber,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun
} from 'docx'
import type { CellTherapy } from '../store/entity/cellTherapy.ts'
import type { Chemotherapy } from '../store/entity/chemotherapy.ts'
import type { Diagnosis } from '../store/entity/diagnosis.ts'
import type { Drug } from '../store/entity/drug.ts'
import type { Procedure } from '../store/entity/procedure.ts'
import type { Radiotherapy } from '../store/entity/radiotherapy.ts'
import type { Treatment } from '../store/entity/treatment.ts'
import type { EntityList } from '../store/entityList.ts'
import type { FormStore } from '../store/formStore.ts'
import type { DateInputValue } from '../types/dateInputValue.ts'
import { exportFile } from './exportFile.ts'

const styles: IStylesOptions = {
    default: {
        title: {
            run: {
                size: '18pt',
                bold: true
            },
            paragraph: {
                spacing: {
                    after: 360
                },
                alignment: AlignmentType.CENTER,
                keepNext: true
            }
        },
        heading1: {
            run: {
                size: '16pt',
                bold: true
            },
            paragraph: {
                spacing: {
                    before: 480,
                    after: 120
                },
                keepNext: true
            }
        },
        heading2: {
            run: {
                size: '14pt',
                bold: true
            },
            paragraph: {
                spacing: {
                    after: 240
                },
                keepNext: true
            }
        },
        heading3: {
            run: {
                size: '13pt',
                bold: true
            },
            paragraph: {
                spacing: {
                    before: 0,
                    after: 0
                },
                keepNext: true
            }
        },
        listParagraph: {
            paragraph: {
                spacing: {
                    after: 0
                }
            }
        },
        document: {
            run: {
                font: 'Open Sans',
                size: '11pt'
            },
            paragraph: {
                spacing: {
                    before: 0,
                    after: 240,
                    line: 260
                }
            }
        }
    },
    paragraphStyles: [
        {
            id: 'indented',
            name: 'Indented',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            paragraph: {
                indent: {
                    left: 240
                }
            }
        }
    ]
}

const formatDate = (date: string) => dayjs(date).format('DD.MM.YYYY')

const dateOrUnknown = (date: DateInputValue) => date ? formatDate(date) : 'Ei tiedossa'

const textWithLabel = (label: string, text: string, breakBefore?: boolean) => [
    new TextRun({ text: `${label}: `, bold: true, break: breakBefore ? 1 : undefined }),
    new TextRun(text)
]

type TextListContent = { label?: string, text: string }[]

const textList = (content: TextListContent): TextRun[] => {
    const textRuns: TextRun[] = []
    let isFirst = true
    content.forEach((item) => {
        if (item.text) {
            const breakBefore = !isFirst
            if (item.label) {
                textRuns.push(...textWithLabel(item.label, item.text, breakBefore))
            } else {
                textRuns.push(new TextRun({ text: item.text, break: breakBefore ? 1 : undefined }))
            }
            isFirst = false
        }
    })
    return textRuns
}

const drugList = (drugs: EntityList<Drug>): TextRun[] => {
    const textRuns: TextRun[] = []
    drugs.entities.forEach((drug, index) => {
        textRuns.push(new TextRun({
            text: `${drug.drug} ${drug.dose.toLocaleString()} ${drug.doseFormula ?? '[annoskaava puuttuu]'}`,
            break: index !== 0 ? 1 : undefined
        }))
        const doxoEquivalent = drug.doxoEquivalent
        if (doxoEquivalent) {
            textRuns.push(new TextRun({
                text: `\tvastaa doksorubisiinia ${doxoEquivalent} mg/m²`,
                break: 1
            }))
        }
        if (drug.notes) {
            textRuns.push(new TextRun({
                text: `\t${drug.notes}`,
                break: 1
            }))
        }
    })
    return textRuns
}

const itemParagraphs = (heading: string, content: TextRun[], isLast: boolean): Paragraph[] => {
    const paragraphs: Paragraph[] = []

    paragraphs.push(new Paragraph({
        text: heading,
        heading: HeadingLevel.HEADING_3
    }))

    paragraphs.push(new Paragraph({
        children: content,
        style: 'indented',
        keepLines: true,
        keepNext: !isLast
    }))

    return paragraphs
}

export const generateDoc = async (data: FormStore, patient: { name: string, id: string }) => {
    const diagnoses = data.diagnoses.entities as Diagnosis[]
    const treatments = data.treatments.entities as Treatment[]
    const chemotherapies = data.chemotherapies.entities as Chemotherapy[]
    const radiotherapies = data.radiotherapies.entities as Radiotherapy[]
    const procedures = data.procedures.entities as Procedure[]
    const cellTherapies = data.cellTherapies.entities as CellTherapy[]
    const foreignBodies = data.foreignBodies.entities
    const adverseEffects = data.adverseEffects.entities
    const followup = data.followup
    const signature = data.signature

    //
    // HEADER AND FOOTER
    //

    const header = new Header({
        children: [
            new Paragraph({
                children: [
                    new TextRun('Yhteenveto syöpähoidoista'),
                    new TextRun(`\t${patient.name}`),
                    new TextRun({
                        text: `\t${patient.id}`,
                        break: 1
                    })
                ],
                tabStops: [
                    {
                        type: TabStopType.RIGHT,
                        position: TabStopPosition.MAX
                    }
                ]
            })
        ]
    })

    const footer = new Footer({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        children: [
                            'Sivu ',
                            PageNumber.CURRENT,
                            ' / ',
                            PageNumber.TOTAL_PAGES
                        ]
                    })
                ],
                alignment: AlignmentType.RIGHT
            })
        ]
    })

    //
    // MAIN CONTENT
    //

    const content: Paragraph[] = []

    // NAME AND ID

    content.push(new Paragraph({
        text: 'Yhteenveto syöpähoidoista',
        heading: HeadingLevel.TITLE
    }))

    content.push(new Paragraph({
        children: textList([
            { label: 'Nimi', text: patient.name },
            { label: 'Henkilötunnus', text: patient.id }
        ])
    }))

    // DIAGNOSES

    if (diagnoses.length > 0) {
        content.push(new Paragraph({
            text: 'Diagnoosit',
            heading: HeadingLevel.HEADING_1
        }))

        diagnoses.forEach((item, index, list) => {
            content.push(...itemParagraphs(
                `${item.icd10} ${item.text}`,
                textList([
                    { text: item.detail },
                    { label: 'Todettu', text: dateOrUnknown(item.date) },
                    { label: 'Stage', text: item.stage },
                    { label: 'Levinneisyys', text: item.spread }
                ]),
                index === list.length - 1
            ))
        })
    }

    // TREATMENTS

    if (treatments.length > 0) {
        content.push(new Paragraph({
            text: 'Hoito-ohjelmat',
            heading: HeadingLevel.HEADING_1
        }))

        treatments.forEach((item, index, list) => {
            content.push(...itemParagraphs(
                item.protocol,
                textList([
                    { text: `${dateOrUnknown(item.startDate)} - ${dateOrUnknown(item.endDate)}` },
                    { label: 'Hoitoryhmä', text: item.group },
                    { label: 'Hoidon loppumisen syy', text: item.stopReason }
                ]),
                index === list.length - 1
            ))
        })
    }

    // CHEMOTHERAPIES

    if (chemotherapies.length > 0) {
        content.push(new Paragraph({
            text: 'Lääkehoidot',
            heading: HeadingLevel.HEADING_1
        }))

        const cellTherapiesHaveDrugs = cellTherapies.some(item => item.drugs.entityCount > 0)

        if (cellTherapiesHaveDrugs) {
            content.push(new Paragraph({
                text: 'Soluhoitojen esihoitojen lääkeannokset ks. "Kantasolusiirrot ja muut soluhoidot"',
                keepNext: true
            }))
        }

        chemotherapies.forEach(item => {
            content.push(...itemParagraphs(
                `${dateOrUnknown(item.startDate)} - ${dateOrUnknown(item.endDate)}`,
                drugList(item.drugs),
                false // chapter continues after this --> prevent page break
            ))
        })

        content.push(new Paragraph({
            text: `Kumulatiiviset annokset${cellTherapiesHaveDrugs ? ' (ml. soluhoitojen esihoitolääkkeet)' : ''}`,
            heading: HeadingLevel.HEADING_2
        }))

        const totalDoxoEquivalent =
            chemotherapies.reduce((value, item) => value + item.doxoEquivalent, 0) +
            cellTherapies.reduce((value, item) => value + item.doxoEquivalent, 0)

        const totalCycloEquivalent =
            chemotherapies.reduce((value, item) => value + item.cycloEquivalent, 0) +
            cellTherapies.reduce((value, item) => value + item.cycloEquivalent, 0)

        content.push(new Paragraph({
            children: textList([
                { label: 'Antrasykliinit', text: `${totalDoxoEquivalent.toFixed(0)} mg/m² doksorubisiiniekvivalenttia`},
                { label: 'Alkyloivat aineet', text: `${totalCycloEquivalent.toFixed(0)} mg/m² syklofosfamidiekvivalenttia`}
            ]),
            keepLines: true
        }))
    }

    // RADIOTHERAPIES

    if (radiotherapies.length > 0) {
        content.push(new Paragraph({
            text: 'Sädehoidot',
            heading: HeadingLevel.HEADING_1
        }))

        radiotherapies.forEach((item, index, list) => {
            content.push(...itemParagraphs(
                item.target,
                textList([
                    { text: `${dateOrUnknown(item.startDate)} - ${dateOrUnknown(item.endDate)}` },
                    { label: 'Hoitomuoto', text: item.mode },
                    { label: 'Annos', text: `${item.fractions} x ${item.singleDose} Gy = ${item.totalDose} Gy` },
                    { label: 'Lisätiedot', text: item.notes }
                ]),
                index === list.length - 1
            ))
        })
    }

    // PROCEDURES

    if (procedures.length > 0) {
        content.push(new Paragraph({
            text: 'Leikkaukset ja toimenpiteet',
            heading: HeadingLevel.HEADING_1
        }))

        procedures.forEach((item, index, list) => {
            content.push(...itemParagraphs(
                item.procedure,
                textList([
                    { text: `${dateOrUnknown(item.date)}` },
                    { label: 'Tarkempi kuvaus', text: item.details },
                    { label: 'Komplikaatiot', text: item.complications },
                ]),
                index === list.length - 1
            ))
        })
    }

    // CELL THERAPIES

    if (cellTherapies.length > 0) {
        content.push(new Paragraph({
            text: 'Kantasolusiirrot ja muut soluhoidot',
            heading: HeadingLevel.HEADING_1
        }))

        cellTherapies.forEach((item, index, list) => {

        })
    }

    //
    // FINALIZING
    //

    const doc = new Document({
        creator: data.signature.place,
        title: 'Yhteenveto syöpähoidoista',
        styles: styles,
        sections: [
            {
                headers: { default: header },
                footers: { default: footer },
                children: content
            }
        ]
    })

    const blob = await Packer.toBlob(doc)
    exportFile('yhteenveto.docx', blob, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
}