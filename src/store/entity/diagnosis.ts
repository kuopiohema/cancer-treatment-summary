import { makeObservable, observable } from 'mobx'
import { DateInputValue } from '../../types/dateInputValue'
import { Entity } from './entity'

export class Diagnosis extends Entity {
    date: DateInputValue = null
    icd10 = ''
    text = ''
    detail = ''
    stage = ''
    spread = ''

    constructor() {
        super()
        makeObservable(this, {
            date: observable,
            icd10: observable,
            text: observable,
            detail: observable,
            stage: observable,
            spread: observable
        })
    }

    itemName = 'diagnoosi'
}