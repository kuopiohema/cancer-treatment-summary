import { atom, PrimitiveAtom, WritableAtom } from "jotai";
import { Entity } from "../types/form/entity";
import { navLocationAtom, Path } from "./nav";

export interface EntityListActionAtoms<E extends Entity> {
    addAtom: WritableAtom<null, [], void>
    updateAtom: WritableAtom<null, [entity: E], void>
    swapAtom: WritableAtom<null, [firstIndex: number, secondIndex: number], void>
    removeAtom: WritableAtom<null, [id: string], void>
    setAtom: WritableAtom<null, [entities: E[]], void>
}

export const createEntityListActionAtoms = <E extends Entity>(entityListAtom: PrimitiveAtom<E[]>, factory: () => E, navPath: Path | ''): EntityListActionAtoms<E> => {
    const addAtom = atom(
        null,
        (get, set) => {
            const newEntity = factory()
            set(entityListAtom, [...get(entityListAtom), newEntity])
            if (navPath)
                set(navLocationAtom, navPath, newEntity.id)
        }
    )

    const updateAtom = atom(
        null,
        (get, set, entity: E) => {
            const entities = get(entityListAtom)
            const index = entities.findIndex(element => element.id === entity.id)
            if (index === -1)
                return
            entities[index] = entity
            set(entityListAtom, entities)
        }
    )

    const swapAtom = atom(
        null,
        (get, set, firstIndex: number, secondIndex: number) => {
            const entities = get(entityListAtom)
            if (firstIndex < 0 || firstIndex > entities.length - 1 || secondIndex < 0 || secondIndex > entities.length - 1)
                return
            [entities[firstIndex], entities[secondIndex]] = [entities[secondIndex], entities[firstIndex]]
            set(entityListAtom, entities)
        }
    )

    const removeAtom = atom(
        null,
        (get, set, id: string) => {
            const entities = get(entityListAtom)
            
            const index = entities.findIndex(element => element.id === id)
            if (index === -1)
                return

            const newEntities = entities.filter(element => element.id !== id)
            set(entityListAtom, newEntities)

            if (navPath) {
                const navLocation = get(navLocationAtom)
                if (navLocation.path === navPath && navLocation.entityId === id) {
                    if (newEntities.length > 0) {
                        const prevIndex = Math.min(index, newEntities.length - 1)
                        set(navLocationAtom, navPath, newEntities[prevIndex].id)
                    } else {
                        set(navLocationAtom, 'start', '')
                    }
                }
            }
        }
    )

    const setAtom = atom(
        null,
        (_, set, entities: E[]) => {
            set(entityListAtom, entities)
        }
    )

    return { addAtom, updateAtom, swapAtom, removeAtom, setAtom }
}