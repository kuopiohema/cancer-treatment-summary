import { observable, runInAction } from 'mobx'
import { fetchJson } from "../utils/fetchJson";
import { showNotification } from '../utils/showNotification.tsx'
import { withUnknown } from "../utils/withUnknown";
import { type DrugEquivalenceList, getEmptyDrugEquivalenceList } from './dataInterfaces/drugEquivalenceList.ts'
import { getEmptyFollowupDefaults, FollowupDefaults } from "./dataInterfaces/followupDefaults";
import { getEmptySignatureDefaults, SignatureDefaults } from "./dataInterfaces/signatureDefaults";

export class Data {
    @observable accessor doxoEquivalents: DrugEquivalenceList = getEmptyDrugEquivalenceList()
    @observable accessor cycloEquivalents: DrugEquivalenceList = getEmptyDrugEquivalenceList()
    @observable accessor followupDefaults: FollowupDefaults = getEmptyFollowupDefaults()
    @observable accessor signatureDefaults: SignatureDefaults = getEmptySignatureDefaults()

    // SELECT OPTIONS
    @observable accessor treatmentStopReasonOptions: string[] = []
    @observable accessor doseFormulaOptions: string[] = []
    @observable accessor radiotherapyModeOptions: string[] = []

    @observable accessor cellOriginOptions: string[] = []
    @observable accessor cellTherapyTypeOptions: string[] = []
    @observable accessor carTargetOptions: string[] = []
    @observable accessor cellDonorOptions: string[] = []
    @observable accessor hlaMatchOptions: string[] = []
    @observable accessor bloodGroupOptions: string[] = []

    @observable accessor foreignBodyTypeOptions: string[] = []
    @observable accessor foreignBodyRemovalOptions: string[] = []

    @observable accessor organSystemOptions: string[] = []

    async fetchData() {
        try {
            const doxoEquivalents = await fetchJson<DrugEquivalenceList>('doxoEquivalents')
            const cycloEquivalents = await fetchJson<DrugEquivalenceList>('cycloEquivalents')
            const followupDefaults = await fetchJson<FollowupDefaults>('followupDefaults')
            const signatureDefaults = await fetchJson<SignatureDefaults>('signatureDefaults')

            const treatmentStopReasonOptions = await fetchJson<string[]>('selectOptions/treatmentStopReason')
            const doseFormulaOptions = await fetchJson<string[]>('selectOptions/doseFormula')
            const radiotherapyModeOptions = await fetchJson<string[]>('selectOptions/radiotherapyMode')

            const cellOriginOptions = await fetchJson<string[]>('selectOptions/cellOrigin')
            const cellTherapyTypeOptions = await fetchJson<string[]>('selectOptions/cellTherapyType')
            const carTargetOptions = await fetchJson<string[]>('selectOptions/carTarget')
            const cellDonorOptions = await fetchJson<string[]>('selectOptions/cellDonor')
            const hlaMatchOptions = await fetchJson<string[]>('selectOptions/hlaMatch')
            const bloodGroupOptions = await fetchJson<string[]>('selectOptions/bloodGroup')

            const foreignBodyTypeOptions = await fetchJson<string[]>('selectOptions/foreignBodyType')
            const foreignBodyRemovalOptions = await fetchJson<string[]>('selectOptions/foreignBodyRemoval')

            const organSystemOptions = await fetchJson<string[]>('selectOptions/organSystem')

            runInAction(() => {
                this.doxoEquivalents = doxoEquivalents
                this.cycloEquivalents = cycloEquivalents
                this.followupDefaults = followupDefaults
                this.signatureDefaults = signatureDefaults
                this.treatmentStopReasonOptions = withUnknown(treatmentStopReasonOptions)
                this.doseFormulaOptions = doseFormulaOptions
                this.radiotherapyModeOptions = withUnknown(radiotherapyModeOptions)
                this.cellOriginOptions = cellOriginOptions
                this.cellTherapyTypeOptions = cellTherapyTypeOptions
                this.carTargetOptions = carTargetOptions
                this.cellDonorOptions = cellDonorOptions
                this.hlaMatchOptions = withUnknown(hlaMatchOptions)
                this.bloodGroupOptions = withUnknown(bloodGroupOptions)
                this.foreignBodyTypeOptions = foreignBodyTypeOptions
                this.foreignBodyRemovalOptions = foreignBodyRemovalOptions
                this.organSystemOptions = organSystemOptions
            })
        } catch (e) {
            showNotification(
                'Virhe taustatietojen lataamisessa',
                typeof e === 'string' ? e : e instanceof Error ? e.message : 'Tuntematon virhe'
            )
        }
    }
}