import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { Diagnosis, newDiagnosis } from "../types/form/diagnosis";
import { createEntityListActionAtoms } from "./createEntityListActionAtoms";

const storeAtom = atom({
    diagnoses: [] as Diagnosis[]
})

const diagnosesAtom = focusAtom(storeAtom, (optic) => optic.prop('diagnoses'))
const diagnosesActionAtoms = createEntityListActionAtoms(diagnosesAtom, newDiagnosis, 'diagnoses')

export { diagnosesAtom, diagnosesActionAtoms, storeAtom }