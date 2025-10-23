import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { override } from "mobx";
import { getTextList } from "../../utils/getTextList";
import formatDate from "../../utils/formatDate";
import { DateInputValue } from "../../types/dateInputValue";
import { NumberInputValue } from "../../types/numberInputValue";
import { getOptionText } from "../../utils/selectOptionListUtils";
import { dataCtx } from "../store";

@model('catrest/radiotherapy')
export class Radiotherapy extends ExtendedModel(Entity, {
    startDate: prop<DateInputValue>(null).withSetter(),
    endDate: prop<DateInputValue>(null).withSetter(),
    target: prop('').withSetter(),
    mode: prop('').withSetter(),
    modeOther: prop('').withSetter(),
    singleDose: prop<NumberInputValue>(0).withSetter(),
    totalDose: prop<NumberInputValue>(0).withSetter(),
    fractions: prop<NumberInputValue>(0).withSetter(),
    notes: prop('').withSetter()
}) {
    itemName = 'sädehoitojakso'

    @override
    get label() {
        return this.target || '(Uusi sädehoitojakso)'
    }

    @override
    get sublabel() {
        const data = dataCtx.get(this)
        return getTextList([
            getOptionText(this.mode, data.radiotherapyModeOptions, this.modeOther),
            `${formatDate(this.startDate)} - ${formatDate(this.endDate)}`,
            `${this.totalDose} Gy (${this.fractions} x ${this.singleDose} Gy)`,
            this.notes
        ])
    }
}