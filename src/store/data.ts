import { makeAutoObservable, runInAction } from 'mobx'
import { fetchJson } from "../utils/fetchJson";
import { showNotification } from '../utils/showNotification.tsx'
import { type DrugEquivalenceList, getEmptyDrugEquivalenceList } from './dataInterfaces/drugEquivalenceList.ts'

export class Data {
    doxoEquivalents: DrugEquivalenceList = getEmptyDrugEquivalenceList()
    cycloEquivalents: DrugEquivalenceList = getEmptyDrugEquivalenceList()

    constructor() {
        makeAutoObservable(this)
    }

    async fetchData() {
        try {
            const doxoEquivalents = await fetchJson<DrugEquivalenceList>('doxoEquivalents')
            const cycloEquivalents = await fetchJson<DrugEquivalenceList>('cycloEquivalents')

            runInAction(() => {
                this.doxoEquivalents = doxoEquivalents
                this.cycloEquivalents = cycloEquivalents
            })
        } catch (e) {
            showNotification(
                'Virhe taustatietojen lataamisessa',
                typeof e === 'string' ? e : e instanceof Error ? e.message : 'Tuntematon virhe'
            )
        }
    }
}