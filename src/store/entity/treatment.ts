import { ExtendedModel, model, prop } from "mobx-keystone";
import { stopReasonOptions, StopReasonValue } from "../../data/stopReasonOptions";
import { Entity } from "./entity";
import { override } from "mobx";
import { getTextList } from "../../utils/getTextList";
import formatDate from "../../utils/formatDate";
import { getOptionText } from "../../utils/getOptionText";

@model('catrest/treatment')
export class Treatment extends ExtendedModel(Entity, {
    protocol: prop('').withSetter(),
    group: prop('').withSetter(),
    startDate: prop<string | null>(null).withSetter(),
    endDate: prop<string | null>(null).withSetter(),
    stopReason: prop<StopReasonValue>('').withSetter(),
    stopReasonOther: prop('').withSetter()
}) {
    itemName = 'hoito'
    
    @override
    get label() {
        return this.protocol || '(Uusi hoito)'
    }

    @override
    get sublabel() {
        return getTextList([
            `${formatDate(this.startDate)} - ${formatDate(this.endDate)}`,
            this.group,
            {
                heading: 'Hoidon loppumisen syy',
                content: getOptionText(this.stopReason, stopReasonOptions, this.stopReasonOther)
            }
        ])
    }
}