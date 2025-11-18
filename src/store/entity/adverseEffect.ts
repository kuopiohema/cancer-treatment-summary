import { makeObservable, observable } from "mobx";
import { Entity } from "./entity";

export class AdverseEffect extends Entity {
    organSystem = ''
    description = ''

    itemName = 'haittavaikutus'

    constructor() {
        super()
        makeObservable(this, {
            organSystem: observable,
            description: observable
        })
    }
}