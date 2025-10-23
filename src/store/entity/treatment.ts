import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { override } from "mobx";
import { getTextList } from "../../utils/getTextList";
import formatDate from "../../utils/formatDate";
import { DateInputValue } from "../../types/dateInputValue";
import { dataCtx } from "../store";
import { getOptionText } from "../../utils/selectOptionListUtils";

@model('catrest/treatment')
export class Treatment extends ExtendedModel(Entity, {
    protocol: prop('').withSetter(),
    group: prop('').withSetter(),
    startDate: prop<DateInputValue>(null).withSetter(),
    endDate: prop<DateInputValue>(null).withSetter(),
    stopReason: prop('').withSetter(),
    stopReasonOther: prop('').withSetter()
}) {
    itemName = 'hoito'
    
    @override
    get label() {
        return this.protocol || '(Uusi hoito)'
    }

    @override
    get sublabel() {
        const data = dataCtx.get(this)
        return getTextList([
            `${formatDate(this.startDate)} - ${formatDate(this.endDate)}`,
            this.group,
            {
                heading: 'Hoidon loppumisen syy',
                content: getOptionText(this.stopReason, data.treatmentStopReasonOptions, this.stopReasonOther)
            }
        ])
    }
}