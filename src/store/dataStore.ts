import { _async, _await, Model, model, modelFlow, prop } from "mobx-keystone";
import { fetchJson } from "../utils/fetchJson";
import { withUnknown } from "../utils/withUnknown";
import { type DrugEquivalenceList, getEmptyDrugEquivalenceList } from './dataInterfaces/drugEquivalenceList.ts'
import { getEmptyFollowupDefaults, FollowupDefaults } from "./dataInterfaces/followupDefaults";
import { getEmptySignatureDefaults, SignatureDefaults } from "./dataInterfaces/signatureDefaults";

@model('catrest/dataStore')
export class DataStore extends Model({
    doxoEquivalents: prop<DrugEquivalenceList>(getEmptyDrugEquivalenceList),
    cycloEquivalents: prop<DrugEquivalenceList>(getEmptyDrugEquivalenceList),
    followupDefaults: prop<FollowupDefaults>(getEmptyFollowupDefaults),
    signatureDefaults: prop<SignatureDefaults>(getEmptySignatureDefaults),

    // SELECT OPTIONS
    treatmentStopReasonOptions: prop<string[]>(() => []),
    doseFormulaOptions: prop<string[]>(() => []),
    radiotherapyModeOptions: prop<string[]>(() => []),
    
    cellOriginOptions: prop<string[]>(() => []),
    cellTherapyTypeOptions: prop<string[]>(() => []),
    carTargetOptions: prop<string[]>(() => []),
    cellDonorOptions: prop<string[]>(() => []),
    hlaMatchOptions: prop<string[]>(() => []),
    bloodGroupOptions: prop<string[]>(() => []),
        
    foreignBodyTypeOptions: prop<string[]>(() => []),
    foreignBodyRemovalOptions: prop<string[]>(() => []),

    organSystemOptions: prop<string[]>(() => [])
}) {
    @modelFlow
    fetchData = _async(function* (this: DataStore) {
        this.doxoEquivalents = yield* _await(fetchJson<DrugEquivalenceList>('doxoEquivalents'))
        this.cycloEquivalents = yield* _await(fetchJson<DrugEquivalenceList>('cycloEquivalents'))
        this.followupDefaults = yield* _await(fetchJson<FollowupDefaults>('followupDefaults'))
        this.signatureDefaults = yield* _await(fetchJson<SignatureDefaults>('signatureDefaults'))
        
        this.treatmentStopReasonOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/treatmentStopReason')))
        this.doseFormulaOptions = yield* _await(fetchJson<string[]>('selectOptions/doseFormula'))
        this.radiotherapyModeOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/radiotherapyMode')))

        this.cellOriginOptions = yield* _await(fetchJson<string[]>('selectOptions/cellOrigin'))
        this.cellTherapyTypeOptions = yield* _await(fetchJson<string[]>('selectOptions/cellTherapyType'))
        this.carTargetOptions = yield* _await(fetchJson<string[]>('selectOptions/carTarget'))
        this.cellDonorOptions = yield* _await(fetchJson<string[]>('selectOptions/cellDonor'))
        this.hlaMatchOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/hlaMatch')))
        this.bloodGroupOptions = withUnknown(yield* _await(fetchJson<string[]>('selectOptions/bloodGroup')))
        
        this.foreignBodyTypeOptions = yield* _await(fetchJson<string[]>('selectOptions/foreignBodyType'))
        this.foreignBodyRemovalOptions = yield* _await(fetchJson<string[]>('selectOptions/foreignBodyRemoval'))

        this.organSystemOptions = yield* _await(fetchJson<string[]>('selectOptions/organSystem'))
    })
}