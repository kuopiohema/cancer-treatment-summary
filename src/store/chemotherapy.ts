import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import formatDate from "../utils/formatDate";
import { override } from "mobx";
import { EntityList } from "./entityList";
import { Drug } from "./drug";

@model('catrest/chemotherapy')
export class Chemotherapy extends ExtendedModel(Entity, {
    startDate: prop<string | null>(null).withSetter(),
    endDate: prop<string | null>(null).withSetter(),
    drugs: prop<EntityList<Drug>>(() => new EntityList({}))
}) {
    itemName = 'kemoterapiajakso'

    @override
    get label() {
        return `${formatDate(this.startDate)} - ${formatDate(this.endDate)}`
    }

    @override
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get sublabel() {
        return ''
    }
}