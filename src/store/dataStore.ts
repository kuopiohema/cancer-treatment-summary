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

    treatmentStopReasonOptions: prop<string[]>(() => []),
    doseFormulaOptions: prop<string[]>(() => []),
    radiotherapyModeOptions: prop<string[]>(() => []),
    
    cellOriginOptions: prop<string[]>(() => []),
    cellTypeOptions: prop<string[]>(() => []),
    carTargetOptions: prop<string[]>(() => []),
    cellDonorOptions: prop<string[]>(() => []),
    hlaMatchOptions: prop<string[]>(() => []),
    bloodGroupOptions: prop<string[]>(() => []),
        
    foreignBodyTypeOptions: prop<string[]>(() => []),
    foreignBodyRemovalOptions: prop<string[]>(() => [])
}) {
    @modelFlow
    fetchData = _async(function* (this: DataStore) {
        this.doxoEquivalents = yield* _await(fetchJson<DoxoEquivalent[]>('doxoEquivalents'))
        
        this.treatmentStopReasonOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/treatmentStopReason')))
        this.doseFormulaOptions = yield* _await(fetchJson<string[]>('selectOptions/doseFormula'))
        this.radiotherapyModeOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/radiotherapyMode')))

        this.cellOriginOptions = yield* _await(fetchJson<string[]>('selectOptions/cellOrigin'))
        this.cellTypeOptions = yield* _await(fetchJson<string[]>('selectOptions/cellType'))
        this.carTargetOptions = yield* _await(fetchJson<string[]>('selectOptions/carTarget'))
        this.cellDonorOptions = yield* _await(fetchJson<string[]>('selectOptions/cellDonor'))
        this.hlaMatchOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/hlaMatch')))
        this.bloodGroupOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/bloodGroup')))
        
        this.foreignBodyTypeOptions = yield* _await(fetchJson<string[]>('selectOptions/foreignBodyType'))
        this.foreignBodyRemovalOptions = yield* _await(fetchJson<string[]>('selectOptions/foreignBodyRemoval'))
    })
}