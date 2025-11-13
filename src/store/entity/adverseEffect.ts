import { observable } from 'mobx'
import { Entity } from "./entity";

export class AdverseEffect extends Entity {
    @observable accessor organSystem = ''
    @observable accessor description = ''

    itemName = 'haittavaikutus'
}