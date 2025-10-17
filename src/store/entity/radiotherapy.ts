import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { radioModeOptions, RadioModeValue } from "../../data/radioModeOptions";
import { override } from "mobx";
import { getTextList } from "../../utils/getTextList";
import formatDate from "../../utils/formatDate";
import { getOptionText } from "../../data/dataUtils";
import { DateInputValue } from "../../types/dateInputValue";
import { NumberInputValue } from "../../types/numberInputValue";

@model('catrest/radiotherapy')
export class Radiotherapy extends ExtendedModel(Entity, {
    startDate: prop<DateInputValue>(null).withSetter(),
    endDate: prop<DateInputValue>(null).withSetter(),
    target: prop('').withSetter(),
    mode: prop<RadioModeValue>('').withSetter(),
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
        return getTextList([
            getOptionText(this.mode, radioModeOptions, this.modeOther),
            `${formatDate(this.startDate)} - ${formatDate(this.endDate)}`,
            `${this.totalDose} Gy (${this.fractions} x ${this.singleDose} Gy)`,
            this.notes
        ])
    }
}