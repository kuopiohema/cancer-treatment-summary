import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { navLocationAtom, Path } from "../atoms/nav";
import { Entity } from "../types/form/entity";

export type AddCallback = () => void
export type UpdateCallback<E extends Entity> = (item: E) => void
export type SwapCallback = (firstIndex: number, secondIndex: number) => void
export type RemoveCallback = (id: string) => void
export type SetCallback<E extends Entity> = (list: E[]) => void

export interface EntityStore<E extends Entity> {
    entities: E[]
    actions: {
        add: AddCallback
        update: UpdateCallback<E>
        swap: SwapCallback
        remove: RemoveCallback
        set: SetCallback<E>
    }
}

export const useEntityStore = <E extends Entity>(entityFactory: () => E, path?: Path, onUpdate?: (data: E[]) => void, initialValues?: E[]): EntityStore<E> => {
    const [entities, setEntities] = useState<E[]>(initialValues ?? [])

    const [navLocation, setNavLocation] = useAtom(navLocationAtom)

    const add = () => {
        const newEntity = entityFactory()
        setEntities([...entities, newEntity])
        if (path)
            setNavLocation(path, newEntity.id)
    }

    const update = (entity: E) => {
        console.log(entity)
        const index = entities.findIndex(element => element.id === entity.id)
        if (index === -1)
            return
        const newEntities = [...entities]
        newEntities[index] = entity
        setEntities(newEntities)
    }

    const swap = (firstIndex: number, secondIndex: number) => {
        const newEntities = [...entities]
        if (firstIndex < 0 || firstIndex > newEntities.length - 1 || secondIndex < 0 || secondIndex > newEntities.length - 1)
            return
        [newEntities[firstIndex], newEntities[secondIndex]] = [newEntities[secondIndex], newEntities[firstIndex]]
        setEntities(newEntities)
    }

    const remove = (id: string) => {
        const index = entities.findIndex(element => element.id === id)
        if (index === -1)
            return

        const newEntities = entities.filter(element => element.id !== id)
        setEntities(newEntities)

        if (path && navLocation.path === path && navLocation.entityId === id) {
            if (newEntities.length > 0) {
                const prevIndex = Math.min(index, newEntities.length - 1)
                setNavLocation(path, newEntities[prevIndex].id)
            } else {
                setNavLocation('start', '')
            }
        }
    }

    const set = (entityList: E[]) => {
        setEntities(entityList)
        if (path && navLocation.path === path) {
            if (entityList.length > 0)
                setNavLocation(path, entityList[0].id)
            else
                setNavLocation('start', '')
        }
    }

    const updateCallback = useRef(onUpdate)
    useEffect(() => { updateCallback.current = onUpdate })
    useEffect(() => {
        if (entities !== initialValues)
            updateCallback.current?.(entities)
    }, [entities, initialValues])

    return {
        entities,
        actions: {
            add, update, swap, remove, set
        }
    }
}