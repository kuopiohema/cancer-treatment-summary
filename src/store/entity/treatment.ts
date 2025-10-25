import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { override } from "mobx";
import { buildTextList } from "../../utils/buildTextList";
import { formatDateRange } from "../../utils/formatDate";
import { DateInputValue } from "../../types/dateInputValue";

@model('catrest/treatment')
export class Treatment extends ExtendedModel(Entity, {
    protocol: prop('').withSetter(),
    group: prop('').withSetter(),
    startDate: prop<DateInputValue>(null).withSetter(),
    endDate: prop<DateInputValue>(null).withSetter(),
    stopReason: prop('').withSetter(),
}) {
    itemName = 'hoito'
    
    @override
    get label() {
        return this.protocol || '(Uusi hoito)'
    }

    @override
    get sublabel() {
        return buildTextList([
            formatDateRange(this.startDate, this.endDate),
            this.group,
            {
                heading: 'Hoidon loppumisen syy',
                content: this.stopReason
            }
        ])
    }
}