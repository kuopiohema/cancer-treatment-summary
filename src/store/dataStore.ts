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
    doseFormulaOptions: prop<string[]>(() => []),
    hlaMatchOptions: prop<string[]>(() => []),
    radiotherapyModeOptions: prop<string[]>(() => []),
    stemCellDonorOptions: prop<string[]>(() => []),
    stemCellTypeOptions: prop<string[]>(() => []),
    treatmentStopReasonOptions: prop<string[]>(() => []),
}) {
    @modelFlow
    fetchData = _async(function* (this: DataStore) {
        this.doxoEquivalents = yield* _await(fetchJson<DoxoEquivalent[]>('doxoEquivalents'))
        
        this.bloodGroupOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/bloodGroup')))
        this.doseFormulaOptions = yield* _await(fetchJson<string[]>('selectOptions/doseFormula'))
        this.hlaMatchOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/hlaMatch')))
        this.radiotherapyModeOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/radiotherapyMode')))
        this.stemCellDonorOptions = yield* _await(fetchJson<string[]>('selectOptions/stemCellDonor'))
        this.stemCellTypeOptions = yield* _await(fetchJson<string[]>('selectOptions/stemCellType'))
        this.treatmentStopReasonOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/treatmentStopReason')))
    })
}