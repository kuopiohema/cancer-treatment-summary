import { observable } from 'mobx'
import { Entity } from "./entity";
import { SelectValue } from "../../types/selectValue";

export class ForeignBody extends Entity {
    @observable accessor type = ''
    @observable accessor removal: SelectValue = null

    itemName = 'vierasesine'
}