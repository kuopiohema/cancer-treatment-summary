import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { radioModeOptions, RadioModeValue } from "../../data/radioModeOptions";
import { override } from "mobx";
import { getTextList } from "../../utils/getTextList";
import formatDate from "../../utils/formatDate";
import { getOptionText } from "../../utils/getOptionText";

@model('catrest/radiotherapy')
export class Radiotherapy extends ExtendedModel(Entity, {
    startDate: prop<string | null>(null).withSetter(),
    endDate: prop<string | null>(null).withSetter(),
    target: prop<string>('').withSetter(),
    mode: prop<RadioModeValue>('').withSetter(),
    modeOther: prop<string>('').withSetter(),
    singleDose: prop<string | number>(0).withSetter(),
    totalDose: prop<string | number>(0).withSetter(),
    fractions: prop<string | number>(0).withSetter(),
    notes: prop<string>('').withSetter()
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