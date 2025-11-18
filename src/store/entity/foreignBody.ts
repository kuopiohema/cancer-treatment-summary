import { makeObservable, observable } from 'mobx'
import { Entity } from "./entity";
import { SelectValue } from "../../types/selectValue";

export class ForeignBody extends Entity {
    type = ''
    removal: SelectValue = null

    constructor() {
        super()
        makeObservable(this, {
            type: observable,
            removal: observable
        })
    }

    itemName = 'vierasesine'
}