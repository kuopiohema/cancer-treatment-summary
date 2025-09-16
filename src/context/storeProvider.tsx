import { PropsWithChildren, useMemo } from "react";
import { useEntityList } from "../hooks/useEntityList";
import { Chemotherapy, newChemotherapy } from "../types/form/chemotherapy";
import { Diagnosis, newDiagnosis } from "../types/form/diagnosis";
import { newProcedure, Procedure } from "../types/form/procedure";
import { newRadiotherapy, Radiotherapy } from "../types/form/radiotherapy";
import { newStemCellTransplant, StemCellTransplant } from "../types/form/stemCellTransplant";
import { newTreatment, Treatment } from "../types/form/treatment";
import { Store, StoreContext } from "./storeContext";
import { StoreActions, StoreActionsContext } from "./storeActionsContext";

const StoreProvider = ({ children }: PropsWithChildren) => {
    const diagnoses = useEntityList<Diagnosis>(newDiagnosis, 'diagnoosi')
    const treatments = useEntityList<Treatment>(newTreatment)
    const chemotherapies = useEntityList<Chemotherapy>(newChemotherapy)
    const radiotherapies = useEntityList<Radiotherapy>(newRadiotherapy)
    const procedures = useEntityList<Procedure>(newProcedure)
    const stemCellTransplants = useEntityList<StemCellTransplant>(newStemCellTransplant)

    const store: Store = useMemo(() => ({
        diagnoses,
        treatments,
        chemotherapies,
        radiotherapies,
        procedures,
        stemCellTransplants
    }), [diagnoses, treatments, chemotherapies, radiotherapies, procedures, stemCellTransplants])

    const actions: StoreActions = useMemo(() => {
        const clear = () => {
            diagnoses.actions.set([])
            treatments.actions.set([])
            chemotherapies.actions.set([])
            radiotherapies.actions.set([])
            procedures.actions.set([])
            stemCellTransplants.actions.set([])
        }

        const save = () => {
            const data = {
                diagnoses: diagnoses.entities,
                treatments: treatments.entities,
                chemotherapies: chemotherapies.entities,
                radiotherapies: radiotherapies.entities,
                procedures: procedures.entities,
                stemCellTransplants: stemCellTransplants.entities
            }

            return JSON.stringify(data)
        }

        return { clear, save }
    }, [chemotherapies, diagnoses, procedures, radiotherapies, stemCellTransplants, treatments])

    return (
        <StoreContext value={store}>
            <StoreActionsContext value={actions}>
                {children}
            </StoreActionsContext>
        </StoreContext>
    )
}

export default StoreProvider