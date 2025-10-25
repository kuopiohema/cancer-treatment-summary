import { _async, _await, Model, model, modelFlow, prop } from "mobx-keystone";
import { fetchJson } from "../utils/fetchJson";
import { withUnknown } from "../utils/withUnknown";

interface DoxoEquivalent {
    drug: string,
    factor: number
}

@model('catrest/dataStore')
export class DataStore extends Model({
    doxoEquivalents: prop<DoxoEquivalent[]>(() => []),

    bloodGroupOptions: prop<string[]>(() => []),
    carTargetOptions: prop<string[]>(() => []),
    cellDonorOptions: prop<string[]>(() => []),
    cellOriginOptions: prop<string[]>(() => []),
    cellTypeOptions: prop<string[]>(() => []),
    doseFormulaOptions: prop<string[]>(() => []),
    hlaMatchOptions: prop<string[]>(() => []),
    radiotherapyModeOptions: prop<string[]>(() => []),
    treatmentStopReasonOptions: prop<string[]>(() => []),
}) {
    @modelFlow
    fetchData = _async(function* (this: DataStore) {
        this.doxoEquivalents = yield* _await(fetchJson<DoxoEquivalent[]>('doxoEquivalents'))
        
        this.bloodGroupOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/bloodGroup')))
        this.carTargetOptions = yield* _await(fetchJson<string[]>('selectOptions/carTarget'))
        this.cellDonorOptions = yield* _await(fetchJson<string[]>('selectOptions/cellDonor'))
        this.cellOriginOptions = yield* _await(fetchJson<string[]>('selectOptions/cellOrigin'))
        this.cellTypeOptions = yield* _await(fetchJson<string[]>('selectOptions/cellType'))
        this.doseFormulaOptions = yield* _await(fetchJson<string[]>('selectOptions/doseFormula'))
        this.hlaMatchOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/hlaMatch')))
        this.radiotherapyModeOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/radiotherapyMode')))
        this.treatmentStopReasonOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/treatmentStopReason')))
    })
}