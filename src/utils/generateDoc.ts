import dayjs from 'dayjs'
import type { SnapshotOutOf } from 'mobx-keystone'
import type { Diagnosis } from '../store/entity/diagnosis.ts'
import type { FormStore } from '../store/formStore.ts'
import {
    AlignmentType,
    Document,
    Footer,
    Header, HeadingLevel, type IStylesOptions, Packer,
    PageNumber,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun
} from 'docx'
import type { DateInputValue } from '../types/dateInputValue.ts'
import { exportFile } from './exportFile.ts'

const styles: IStylesOptions = {
    default: {
        title: {
            run: {
                size: '18pt',
                bold: true,
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
                    after: 480
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
                size: '13pt'
            },
            paragraph: {
                spacing: {
                    before: 480,
                    after: 0
                },
                keepNext: true
            }
        },
        document: {
            run: {
                font: 'Open Sans',
                size: '11pt',
            },
            paragraph: {
                spacing: {
                    before: 0,
                    after: 160,
                    line: 260
                }
            }
        }
    },
    paragraphStyles: [
        {
            id: 'noSpacing',
            name: 'No spacing',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            paragraph: {
                spacing: {
                    after: 0
                },
                keepNext: true
            }
        },
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

const dateOrUnknown = (date: DateInputValue, knownText: string, unknownText: string) => {
    if (!date)
        return unknownText

    return `${knownText ? `${knownText} `: ''}${dayjs(date).format('DD.MM.YYYY')}`
}

const textWithLabel = (label: string, text: string, breakBefore?: number) => [
    new TextRun({ text: `${label}: `, bold: true, break: breakBefore }),
    new TextRun(text)
]

const textList = (content: { label?: string, text: string }[]): TextRun[] => {
    const result: TextRun[] = []
    let isFirst = true
    content.forEach(item => {
        if (item.text) {
            const breakBefore = isFirst ? undefined : 1
            if (item.label) {
                result.push(...textWithLabel(item.label, item.text, breakBefore))
            } else {
                result.push(new TextRun({ text: item.text, break: breakBefore }))
            }
            isFirst = false
        }
    })
    return result
}

export const generateDoc = async (data: SnapshotOutOf<FormStore>, patient: { name: string, id: string })=> {
    const diagnoses = data.diagnoses.entities as Diagnosis[]


    // HEADER AND FOOTER

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
            }),
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

    content.push(new Paragraph({
        text: 'Diagnoosit',
        heading: HeadingLevel.HEADING_1
    }))

    if (diagnoses.length === 0) {
        content.push(new Paragraph('Ei diagnooseja'))
    } else {
        diagnoses.forEach(item => {
            content.push(new Paragraph({
                children: [
                    new TextRun({ text: `${item.icd10} ${item.text} `, bold: true }),
                    new TextRun(`(${dateOrUnknown(item.date, 'todettu', 'toteamispäivä ei tiedossa')})`)
                ],
                heading: HeadingLevel.HEADING_3
            }))

            content.push(new Paragraph({
                children: textList([
                    { text: item.detail },
                    { label: 'Stage', text: item.stage },
                    { label: 'Levinneisyys', text: item.spread }
                ])
            }))
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