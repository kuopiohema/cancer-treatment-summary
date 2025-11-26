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
    TabStopDefinition,
    TabStopPosition,
    TabStopType,
    TextRun
} from 'docx'
import type { Drug } from '../store/entities/drug.ts'
import type { Store } from '../store/store.ts'
import type { TextListItem } from './buildTextList.tsx'
import { exportFile } from './exportFile.ts'
import { formatDate } from './formatDate.ts'

const space = 120

const styles: IStylesOptions = {
    default: {
        title: {
            run: {
                size: '18pt',
                bold: true
            },
            paragraph: {
                spacing: {
                    after: 3 * space
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
                    before: 4 * space,
                    after: 1 * space
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
                    after: 2 * space
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
                    after: 2 * space,
                    line: 260
                },
            }
        }
    }
}

const defaultTabStops: TabStopDefinition[] = [
    {
        type: TabStopType.LEFT,
        position: 6 * space
    }
]

const textWithLabel = (label: string, content: string, breakBefore?: boolean) => [
    new TextRun({ text: `${label}: `, bold: true, break: breakBefore ? 1 : undefined }),
    new TextRun(content)
]

export const buildDocxTextList = (data: (TextListItem | null)[]): TextRun[] => {
    const list: TextRun[] = []
    let isFirst = true
    data.filter((item): item is TextListItem => !!item)
        .forEach(item => {
            const { label, content } = typeof item === 'string' ? { label: '', content: item } : item
            if (content) {
                const breakBefore = !isFirst
                if (label)
                    list.push(...textWithLabel(label, content, breakBefore))
                else
                    list.push(new TextRun({ text: content, break: breakBefore ? 1 : undefined }))
                isFirst = false
            }
        })
    return list
}

const drugList = (drugs: Drug[]): TextRun[] => {
    const textRuns: TextRun[] = []
    drugs.forEach((drug, index) => {
        textRuns.push(new TextRun({
            text: `${drug.drug} ${drug.dose.toLocaleString()} ${drug.doseFormula ?? '[annoskaava puuttuu]'}`,
            break: index !== 0 ? 1 : undefined
        }))
        
        const doxoEquivalent = drug.doxoEquivalent
        if (doxoEquivalent && drug.drug.toLocaleLowerCase() !== 'doksorubisiini') {
            textRuns.push(new TextRun(` (vastaa doksorubisiinia ${doxoEquivalent} mg/m²)`))
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
        keepLines: true,
        keepNext: !isLast,
        indent: {
            left: 3 * space
        },
        tabStops: defaultTabStops
    }))

    return paragraphs
}

const convertNewlines = (text: string): TextRun[] => {
    const textArray = text.split('\n')
    const result: TextRun[] = []
    textArray.forEach((item, index) => {
        result.push(new TextRun({ text: item, break: index > 0 ? 1 : undefined }))
    })
    return result
}

export const generateDoc = async (store: Store, patient: { name: string, id: string }) => {
    const diagnoses = store.diagnoses.entities
    const treatments = store.treatments.entities
    const chemotherapies = store.chemotherapies.entities
    const radiotherapies = store.radiotherapies.entities
    const procedures = store.procedures.entities
    const cellTherapies = store.cellTherapies.entities
    const foreignBodies = store.foreignBodies.entities
    const adverseEffects = store.adverseEffects.entities
    const followup = store.followup
    const signature = store.signature

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
        children: buildDocxTextList([
            { label: 'Nimi', content: patient.name },
            { label: 'Henkilötunnus', content: patient.id }
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
                item.label.heading,
                buildDocxTextList(item.label.content),
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
                item.label.heading,
                buildDocxTextList(item.label.content),
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

        const totalDoxoEquivalent =
            chemotherapies.reduce((value, item) => value + item.doxoEquivalent, 0) +
            cellTherapies.reduce((value, item) => value + item.doxoEquivalent, 0)

        content.push(new Paragraph({
            children: textWithLabel(
                'Kumulatiivinen antrasykliiniannos',
                totalDoxoEquivalent > 0 ?
                    `${totalDoxoEquivalent.toFixed(0)} mg/m² doksorubisiiniekvivalenttia` :
                    'Ei ole saanut antrasykliinejä'
            ),
            keepNext: true
        }))

        chemotherapies.forEach((item, index, list) => {
            content.push(...itemParagraphs(
                item.label.heading,
                drugList(item.drugs.entities),
                index === list.length - 1
            ))
        })
    }

    // RADIOTHERAPIES

    if (radiotherapies.length > 0) {
        content.push(new Paragraph({
            text: 'Sädehoidot',
            heading: HeadingLevel.HEADING_1
        }))

        radiotherapies.forEach((item, index, list) => {
            content.push(...itemParagraphs(
                item.label.heading,
                buildDocxTextList(item.label.content),
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
                item.label.heading,
                buildDocxTextList(item.label.content),
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
            const hasDrugs = item.drugs.entityCount > 0
            const isLast = index === list.length - 1

            content.push(...itemParagraphs(
                item.label.heading,
                buildDocxTextList(
                    item.label.content.map(item => {
                        if (typeof item === 'string')
                            return item
                        if (item.label === 'TBI')
                            return { label: 'Koko kehon sädehoito (TBI)', content: item.content }
                        if (item.label === 'DLI')
                            return { label: 'Luovuttajan lymfosyytti-infuusiot (DLI)', content: item.content }
                        return item
                    })
                ),
                !hasDrugs && isLast
            ))

            if (hasDrugs) {
                content.push(new Paragraph({
                    children: [
                        new TextRun({
                            text: 'Esihoidon lääkkeet:',
                            bold: true
                        })
                    ],
                    indent: {
                        left: 3 * space
                    },
                    spacing: {
                        after: 0
                    }
                }))

                content.push(new Paragraph({
                    children: drugList(item.drugs.entities),
                    indent: {
                        left: 6 * space
                    }
                }))
            }
        })
    }

    // FOREIGN BODIES

    if (foreignBodies.length > 0) {
        content.push(new Paragraph({
            text: 'Vierasesineet',
            heading: HeadingLevel.HEADING_1
        }))

        content.push(new Paragraph({
            text: 'Syöpähoitoihin liittyen on asennettu seuraavat vierasesineet:',
            keepNext: true
        }))

        foreignBodies.forEach((item, index, list) => {
            const isLast = index === list.length - 1
            content.push(new Paragraph({
                children: [
                    new TextRun({ text: item.type, bold: true }),
                    new TextRun({ text: item.removal ? ` (${item.removal})` : '' })
                ],
                keepNext: !isLast,
                spacing: {
                    after: isLast ? undefined : 0.5 * space
                }
            }))
        })
    }

    // ADVERSE EFFECTS

    content.push(new Paragraph({
        text: 'Haittavaikutukset',
        heading: HeadingLevel.HEADING_1
    }))

    if (adverseEffects.length === 0) {
        content.push(new Paragraph('Ei todettu merkittäviä syöpähoitojen pitkäaikaishaittoja.'))
    } else {
        content.push(new Paragraph({
            text: 'Seuraavia syöpähoitojen pitkäaikaishaittoja on todettu:',
            keepNext: true
        }))

        adverseEffects.forEach((item, index, list) => {
            const isLast = index === list.length - 1
            content.push(new Paragraph({
                children: textWithLabel(item.organSystem, item.description),
                keepNext: !isLast,
                spacing: {
                    after: isLast ? undefined : 0.5 * space
                }
            }))
        })
    }

    // FOLLOWUP

    content.push(new Paragraph({
        text: 'Jälkiseuranta',
        heading: HeadingLevel.HEADING_1
    }))

    content.push(...itemParagraphs(
        'Yleiset ohjeet',
        convertNewlines(followup.general),
        false
    ))

    content.push(...itemParagraphs(
        'Rokotusohjeet',
        convertNewlines(followup.vaccination),
        true
    ))

    // SIGNATURE

    content.push(new Paragraph({
        children: [
            new TextRun(signature.name),
            new TextRun({ text: `puh. ${signature.phone}`, break: 1 }),
            new TextRun({ text: signature.place, break: 1 }),
            new TextRun({ text: formatDate(signature.date), break: 1 })
        ],
        keepLines: true,
        spacing: {
            before: 4 * space
        },
        border: {
            top: {
                color: 'auto',
                space: 0.5 * space,
                style: 'single',
                size: 2
            }
        }
    }))

    //
    // FINALIZING
    //

    const doc = new Document({
        creator: store.signature.place,
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