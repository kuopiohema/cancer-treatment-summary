import { _async, _await, Model, model, modelFlow, prop } from "mobx-keystone";
import { fetchJson } from "../utils/fetchJson";

export interface DrugEquivalence {
    drug: string
    factor: number
}

export interface DrugEquivalenceList {
    drugs: DrugEquivalence[]
    source: string
}

@model('catrest/DataStore')
export class DataStore extends Model({
    doxoEquivalents: prop<DrugEquivalenceList>(() => ({drugs: [], source: ''})),
    cycloEquivalents: prop<DrugEquivalenceList>(() => ({drugs: [], source: ''}))
}) {
    @modelFlow
    fetchData = _async(function* (this: DataStore) {
        this.doxoEquivalents = yield* _await(fetchJson<DrugEquivalenceList>('doxoEquivalents'))
        this.cycloEquivalents = yield* _await(fetchJson<DrugEquivalenceList>('cycloEquivalents'))
    })
}