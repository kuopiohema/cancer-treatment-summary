import { _async, _await, Model, model, modelFlow, prop } from "mobx-keystone";
import { fetchJson } from "../utils/fetchJson";
import { SelectOptionList } from '../types/selectOptionList';

interface DoxoEquivalent {
    drug: string,
    factor: number
}

@model('catrest/dataStore')
export class DataStore extends Model({
    doxoEquivalents: prop<DoxoEquivalent[]>(() => []),
    bloodGroupOptions: prop<SelectOptionList>(() => ({})),
    doseFormulaOptions: prop<SelectOptionList>(() => ({})),
    hlaMatchOptions: prop<SelectOptionList>(() => ({})),
    radiotherapyModeOptions: prop<SelectOptionList>(() => ({})),
    sexOptions: prop<SelectOptionList>(() => ({})),
    stemCellDonorOptions: prop<SelectOptionList>(() => ({})),
    stemCellTypeOptions: prop<SelectOptionList>(() => ({})),
    treatmentStopReasonOptions: prop<SelectOptionList>(() => ({})),
}) {
    @modelFlow
    fetchData = _async(function* (this: DataStore) {
        this.doxoEquivalents = yield* _await(fetchJson<DoxoEquivalent[]>('doxoEquivalents'))

        this.bloodGroupOptions = yield* _await(fetchJson<SelectOptionList>('selectOptions/bloodGroup'))
        this.doseFormulaOptions = yield* _await(fetchJson<SelectOptionList>('selectOptions/doseFormula'))
        this.hlaMatchOptions = yield* _await(fetchJson<SelectOptionList>('selectOptions/hlaMatch'))
        this.radiotherapyModeOptions = yield* _await(fetchJson<SelectOptionList>('selectOptions/radiotherapyMode'))
        this.sexOptions = yield* _await(fetchJson<SelectOptionList>('selectOptions/sex'))
        this.stemCellDonorOptions = yield* _await(fetchJson<SelectOptionList>('selectOptions/stemCellDonor'))
        this.stemCellTypeOptions = yield* _await(fetchJson<SelectOptionList>('selectOptions/stemCellType'))
        this.treatmentStopReasonOptions = yield* _await(fetchJson<SelectOptionList>('selectOptions/treatmentStopReason'))
    })
}