import { ExtendedModel, model, prop } from "mobx-keystone";
import { Entity } from "./entity";
import { DateInputValue } from "../../types/dateInputValue";

@model('catrest/cellTherapy')
export class CellTherapy extends ExtendedModel(Entity, {
    date: prop<DateInputValue>(null).withSetter()
    
})